(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  root.ArqgenCalc=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  const LIMITS={
    towers:20,
    floors:60,
    units:2000,
    area:100000,
    dimension:600,
    totalUnits:20000,
    totalArea:1000000,
    occupancy:100,
    ca:100,
  };

  function finite(value,fallback=0){
    const number=typeof value==="number"?value:Number(value);
    return Number.isFinite(number)?number:fallback;
  }

  function clamp(value,min,max,fallback=min){
    return Math.min(max,Math.max(min,finite(value,fallback)));
  }

  function round(value,digits=0){
    const factor=10**digits;
    return Math.round(finite(value)*factor)/factor;
  }

  function sanitizeTower(tower,fallback={}){
    const source=tower&&typeof tower==="object"?tower:{};
    const base=fallback&&typeof fallback==="object"?fallback:{};
    return {
      ...base,
      ...source,
      id:String(source.id??base.id??"?").slice(0,8),
      x:clamp(source.x,-1000,1000,finite(base.x)),
      y:clamp(source.y,-1000,1000,finite(base.y)),
      w:clamp(source.w,30,LIMITS.dimension,finite(base.w,30)),
      h:clamp(source.h,20,LIMITS.dimension,finite(base.h,20)),
      floors:Math.round(clamp(source.floors,1,LIMITS.floors,finite(base.floors,1))),
      units:Math.round(clamp(source.units,0,LIMITS.units,finite(base.units))),
      area:Math.round(clamp(source.area,0,LIMITS.area,finite(base.area))),
      type:String(source.type??base.type??"Não informado").slice(0,80),
    };
  }

  function sanitizeTowers(towers){
    if(!Array.isArray(towers))return[];
    return towers.slice(0,LIMITS.towers).map(t=>sanitizeTower(t));
  }

  function polygonArea(points){
    if(!Array.isArray(points)||points.length<3)return NaN;
    const sum=points.reduce((total,p,i)=>{
      const next=points[(i+1)%points.length];
      return total+finite(p?.[0])*finite(next?.[1])-finite(next?.[0])*finite(p?.[1]);
    },0);
    return Math.abs(sum)/2;
  }

  function invalidMetrics(reason){
    return {units:null,area:null,occ:null,ca:null,valid:false,reason};
  }

  function calcMetrics(towers,lotArea,terrainPoints){
    const lot=finite(lotArea,NaN);
    if(!Number.isFinite(lot)||lot<=0)return invalidMetrics("invalid-lot-area");
    if(!Array.isArray(towers))return invalidMetrics("invalid-towers");
    if(towers.length>LIMITS.towers)return invalidMetrics("too-many-towers");
    const clean=sanitizeTowers(towers);
    const units=clean.reduce((sum,t)=>sum+t.units,0);
    const area=clean.reduce((sum,t)=>sum+t.area,0);
    const terrainArea=polygonArea(terrainPoints);
    if(!Number.isFinite(terrainArea)||terrainArea<=0)return invalidMetrics("invalid-terrain");
    const svgPerSquareMeter=terrainArea/lot;
    const footprint=clean.reduce((sum,t)=>sum+(t.w*t.h)/svgPerSquareMeter,0);
    const occ=round(footprint/lot*100,1);
    const ca=round(area/lot,1);
    const values=[units,area,occ,ca];
    if(!values.every(Number.isFinite))return invalidMetrics("non-finite");
    if(units>LIMITS.totalUnits||area>LIMITS.totalArea||occ<0||occ>LIMITS.occupancy||ca<0||ca>LIMITS.ca){
      return invalidMetrics("out-of-range");
    }
    return {units,area,occ,ca,valid:true,reason:null};
  }

  function scaleTower(tower,factor){
    const source=sanitizeTower(tower);
    const safeFactor=clamp(factor,0.25,2,1);
    const w=clamp(Math.round(source.w*safeFactor),30,LIMITS.dimension,source.w);
    const h=clamp(Math.round(source.h*safeFactor),20,LIMITS.dimension,source.h);
    const ratio=(w*h)/(source.w*source.h);
    return sanitizeTower({
      ...source,
      x:source.x+(source.w-w)/2,
      y:source.y+(source.h-h)/2,
      w,h,
      units:Math.round(source.units*ratio),
      area:Math.round(source.area*ratio),
    },source);
  }

  function resizeTowerFromSnapshot(snapshot,nextRect){
    const source=sanitizeTower(snapshot);
    const w=clamp(nextRect?.w,30,LIMITS.dimension,source.w);
    const h=clamp(nextRect?.h,20,LIMITS.dimension,source.h);
    const ratio=(w*h)/(source.w*source.h);
    return sanitizeTower({
      ...source,
      x:finite(nextRect?.x,source.x),
      y:finite(nextRect?.y,source.y),
      w,h,
      units:Math.round(source.units*ratio),
      area:Math.round(source.area*ratio),
    },source);
  }

  function increaseFloors(tower,delta=2){
    const source=sanitizeTower(tower);
    const floors=Math.round(clamp(source.floors+finite(delta),1,LIMITS.floors,source.floors));
    const ratio=floors/source.floors;
    return sanitizeTower({
      ...source,
      floors,
      units:Math.round(source.units*ratio),
      area:Math.round(source.area*ratio),
    },source);
  }

  function generateMassingAlternatives(towers,objective,caLimit,lotArea,terrainPoints){
    const base=sanitizeTowers(towers);
    const limit=Math.max(1,finite(caLimit,12));
    const intent=String(objective||"equilíbrio").toLowerCase();
    const metricsFor=value=>calcMetrics(value,lotArea,terrainPoints);
    const classifyRisk=metrics=>{
      if(!metrics.valid)return "bloqueante";
      if(metrics.ca>=limit)return "alto";
      if(metrics.ca>=limit*0.9)return "médio";
      return "baixo";
    };
    const build=(id,name,description,nextTowers,impact)=>{
      const clean=sanitizeTowers(nextTowers);
      const metrics=metricsFor(clean);
      return {id,name,description,towers:clean,metrics,risk:classifyRisk(metrics),impact};
    };

    const tallest=[...base].sort((a,b)=>b.floors-a.floors)[0];
    const shortest=[...base].sort((a,b)=>a.floors-b.floors)[0];
    const safer=base.map(t=>{
      if(t.id===tallest?.id)return increaseFloors(t,-2);
      if(t.id===shortest?.id&&shortest.id!==tallest?.id)return increaseFloors(t,1);
      return t;
    });

    let density=sanitizeTowers(base);
    for(let step=0;step<24;step++){
      const target=[...density].sort((a,b)=>a.floors-b.floors||a.units-b.units)[0];
      if(!target)break;
      const candidate=density.map(t=>t.id===target.id?increaseFloors(t,1):t);
      const candidateMetrics=metricsFor(candidate);
      if(!candidateMetrics.valid||candidateMetrics.ca>limit-0.1)break;
      density=candidate;
    }

    const largest=[...base].sort((a,b)=>b.w*b.h-a.w*a.h)[0];
    let freeArea=base.map(t=>t.id===largest?.id?scaleTower(t,0.84):t);
    const freeMetrics=metricsFor(freeArea);
    if(freeMetrics.valid&&freeMetrics.ca<limit-1&&shortest){
      freeArea=freeArea.map(t=>t.id===shortest.id?increaseFloors(t,1):t);
    }

    const alternatives=[
      build("lower-risk","Menor risco regulatório","Redistribui altura da torre dominante e preserva margem para ajustes.",safer,"Reduz pressão sobre o CA com perda controlada de unidades."),
      build("max-units","Máximo de unidades seguro","Acrescenta pavimentos gradualmente sem ultrapassar o CA informado.",density,"Usa a margem disponível para ampliar o potencial de unidades."),
      build("more-free-area","Mais área livre","Reduz a maior projeção e recompõe parte do potencial em altura.",freeArea,"Libera solo e reduz ocupação com impacto moderado em unidades."),
    ];
    const preferred=/risco|segur|aprova/.test(intent)?"lower-risk":/livre|perme|verde/.test(intent)?"more-free-area":/unidade|dens|max/.test(intent)?"max-units":"lower-risk";
    return alternatives.map(item=>({...item,recommended:item.id===preferred}));
  }

  function isRenderableNumber(value,max=Number.MAX_SAFE_INTEGER){
    return typeof value==="number"&&Number.isFinite(value)&&Math.abs(value)<=max;
  }

  function formatNumber(value,options={}){
    const {digits=0,suffix="",fallback="--",max=Number.MAX_SAFE_INTEGER}=options;
    if(!isRenderableNumber(value,max))return fallback;
    return `${value.toLocaleString("pt-BR",{minimumFractionDigits:digits,maximumFractionDigits:digits,useGrouping:true})}${suffix}`;
  }

  function escapeHtml(value){
    return String(value??"").replace(/[&<>"']/g,char=>({
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#39;",
    })[char]);
  }

  function decisionStaleness(decision,currentMetrics,currentLimits){
    if(!decision)return {stale:false,metricsChanged:false,assumptionsChanged:false};
    const recordedLimits=decision.limits&&typeof decision.limits==="object"?decision.limits:null;
    const assumptionsChanged=Boolean(recordedLimits)&&(
      finite(recordedLimits.ca,NaN)!==finite(currentLimits?.ca,NaN)||
      finite(recordedLimits.to,NaN)!==finite(currentLimits?.to,NaN)
    );
    if(!currentMetrics?.valid)return {stale:true,metricsChanged:true,assumptionsChanged};
    const unitsBefore=finite(decision.units,NaN);
    const caBefore=finite(decision.ca,NaN);
    const unitsNow=finite(currentMetrics.units,NaN);
    const caNow=finite(currentMetrics.ca,NaN);
    const unitsChanged=Number.isFinite(unitsBefore)&&Number.isFinite(unitsNow)
      ?Math.abs((unitsNow-unitsBefore)/Math.max(Math.abs(unitsBefore),1))>0.1
      :false;
    const caChanged=Number.isFinite(caBefore)&&Number.isFinite(caNow)
      ?Math.abs(caNow-caBefore)>0.5
      :false;
    const metricsChanged=unitsChanged||caChanged;
    return {stale:metricsChanged||assumptionsChanged,metricsChanged,assumptionsChanged};
  }

  function clampFloatingPosition(position,panelSize,viewportSize,margin=8){
    const fallbackGap=Math.max(0,finite(margin,8));
    const margins=margin&&typeof margin==="object"?margin:{};
    const left=Math.max(0,finite(margins.left,fallbackGap));
    const right=Math.max(0,finite(margins.right,fallbackGap));
    const top=Math.max(0,finite(margins.top,fallbackGap));
    const bottom=Math.max(0,finite(margins.bottom,fallbackGap));
    const width=Math.max(0,finite(panelSize?.width));
    const height=Math.max(0,finite(panelSize?.height));
    const viewportWidth=Math.max(0,finite(viewportSize?.width));
    const viewportHeight=Math.max(0,finite(viewportSize?.height));
    const maxX=Math.max(left,viewportWidth-width-right);
    const maxY=Math.max(top,viewportHeight-height-bottom);
    return {
      x:clamp(position?.x,left,maxX,left),
      y:clamp(position?.y,top,maxY,top),
    };
  }

  return {
    LIMITS,
    finite,
    clamp,
    round,
    sanitizeTower,
    sanitizeTowers,
    polygonArea,
    calcMetrics,
    scaleTower,
    resizeTowerFromSnapshot,
    increaseFloors,
    generateMassingAlternatives,
    isRenderableNumber,
    formatNumber,
    escapeHtml,
    decisionStaleness,
    clampFloatingPosition,
  };
});
