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

  function isRenderableNumber(value,max=Number.MAX_SAFE_INTEGER){
    return typeof value==="number"&&Number.isFinite(value)&&Math.abs(value)<=max;
  }

  function formatNumber(value,options={}){
    const {digits=0,suffix="",fallback="--",max=Number.MAX_SAFE_INTEGER}=options;
    if(!isRenderableNumber(value,max))return fallback;
    return `${value.toLocaleString("pt-BR",{minimumFractionDigits:digits,maximumFractionDigits:digits,useGrouping:true})}${suffix}`;
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
    isRenderableNumber,
    formatNumber,
  };
});
