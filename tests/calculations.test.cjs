const test=require("node:test");
const assert=require("node:assert/strict");
const {
  LIMITS,
  calcMetrics,
  sanitizeTower,
  scaleTower,
  resizeTowerFromSnapshot,
  increaseFloors,
  generateMassingAlternatives,
  formatNumber,
  escapeHtml,
  decisionStaleness,
  clampFloatingPosition,
}=require("../calculations.js");

const terrain=[[160,60],[480,40],[560,120],[540,360],[420,400],[180,380],[80,280],[100,140]];
const lot=847;
const towers=[
  {id:"A",x:185,y:145,w:72,h:52,floors:12,units:48,area:2304,type:"Studio"},
  {id:"B",x:310,y:165,w:88,h:60,floors:15,units:75,area:5100,type:"Studio"},
  {id:"C",x:390,y:270,w:64,h:48,floors:10,units:40,area:1920,type:"1 dorm"},
];

test("calcula totais, ocupação e CA com valores finitos",()=>{
  const metrics=calcMetrics(towers,lot,terrain);
  assert.equal(metrics.valid,true);
  assert.equal(metrics.units,163);
  assert.equal(metrics.area,9324);
  assert.equal(metrics.occ,8.4);
  assert.equal(metrics.ca,11);
});

test("resize sempre usa o snapshot inicial e não acumula exponencialmente",()=>{
  const snapshot=towers[0];
  const once=resizeTowerFromSnapshot(snapshot,{x:185,y:145,w:90,h:65});
  const repeated=resizeTowerFromSnapshot(snapshot,{x:185,y:145,w:90,h:65});
  assert.deepEqual(repeated,once);
  assert.equal(once.units,75);
  assert.equal(once.area,3600);
});

test("redução repetida permanece limitada e finita",()=>{
  let tower=towers[0];
  for(let i=0;i<100;i++)tower=scaleTower(tower,0.8);
  assert.equal(Number.isFinite(tower.units),true);
  assert.equal(Number.isFinite(tower.area),true);
  assert.ok(tower.w>=30);
  assert.ok(tower.h>=20);
  assert.ok(tower.units>=0&&tower.units<=LIMITS.units);
});

test("aumento de pavimentos é linear e respeita o limite",()=>{
  const increased=increaseFloors(towers[0],2);
  assert.equal(increased.floors,14);
  assert.equal(increased.units,56);
  assert.equal(increased.area,2688);
  const capped=increaseFloors({...towers[0],floors:60},20);
  assert.equal(capped.floors,60);
});

test("gera alternativas estratégicas distintas, calculadas e aplicáveis",()=>{
  const alternatives=generateMassingAlternatives(towers,"máximo de unidades",12,lot,terrain);
  assert.equal(alternatives.length,3);
  assert.equal(alternatives.filter(item=>item.recommended).length,1);
  assert.equal(alternatives.find(item=>item.recommended).id,"max-units");
  for(const alternative of alternatives){
    assert.equal(alternative.metrics.valid,true);
    assert.ok(Array.isArray(alternative.towers));
    assert.ok(["baixo","médio","alto","bloqueante"].includes(alternative.risk));
  }
  assert.ok(alternatives.find(item=>item.id==="max-units").metrics.ca<=11.9);
});

test("entradas inválidas são sanitizadas",()=>{
  const clean=sanitizeTower({id:"X",w:Infinity,h:NaN,floors:-5,units:1e99,area:"oops"});
  assert.equal(clean.w,30);
  assert.equal(clean.h,20);
  assert.equal(clean.floors,1);
  assert.equal(clean.units,LIMITS.units);
  assert.equal(clean.area,0);
});

test("métricas inválidas retornam estado inválido, nunca NaN ou Infinity",()=>{
  assert.equal(calcMetrics(towers,0,terrain).valid,false);
  assert.equal(calcMetrics(null,lot,terrain).valid,false);
  const absurd=calcMetrics([{...towers[0],area:1e99}],lot,terrain);
  assert.equal(absurd.valid,false);
  for(const value of [absurd.units,absurd.area,absurd.occ,absurd.ca]){
    assert.equal(value,null);
  }
});

test("formatação nunca produz notação científica ou valores não finitos",()=>{
  assert.equal(formatNumber(NaN),"--");
  assert.equal(formatNumber(Infinity),"--");
  assert.equal(formatNumber(1e30,{max:1e9}),"--");
  assert.equal(formatNumber(123456,{suffix:" m²"}),"123.456 m²");
});

test("escape de HTML neutraliza conteúdo executável em relatórios",()=>{
  assert.equal(
    escapeHtml(`<img src=x onerror="alert('x')">&`),
    "&lt;img src=x onerror=&quot;alert(&#39;x&#39;)&quot;&gt;&amp;"
  );
  assert.equal(escapeHtml(null),"");
});

test("decisão fica desatualizada quando métricas ou premissas mudam",()=>{
  const decision={units:100,ca:8,limits:{ca:12,to:50}};
  assert.deepEqual(
    decisionStaleness(decision,{valid:true,units:100,ca:8},{ca:12,to:50}),
    {stale:false,metricsChanged:false,assumptionsChanged:false}
  );
  assert.deepEqual(
    decisionStaleness(decision,{valid:true,units:112,ca:8},{ca:12,to:50}),
    {stale:true,metricsChanged:true,assumptionsChanged:false}
  );
  assert.deepEqual(
    decisionStaleness(decision,{valid:true,units:100,ca:8},{ca:10,to:50}),
    {stale:true,metricsChanged:false,assumptionsChanged:true}
  );
  assert.deepEqual(
    decisionStaleness(decision,{valid:false,units:null,ca:null},{ca:12,to:50}),
    {stale:true,metricsChanged:true,assumptionsChanged:false}
  );
});

test("posição flutuante permanece acessível dentro da viewport",()=>{
  assert.deepEqual(
    clampFloatingPosition({x:900,y:-20},{width:320,height:240},{width:1000,height:700}),
    {x:672,y:8}
  );
  assert.deepEqual(
    clampFloatingPosition({x:100,y:100},{width:1200,height:900},{width:800,height:600}),
    {x:8,y:8}
  );
  assert.deepEqual(
    clampFloatingPosition({x:NaN,y:Infinity},{width:200,height:100},{width:800,height:600}),
    {x:8,y:8}
  );
  assert.deepEqual(
    clampFloatingPosition(
      {x:40,y:8},
      {width:320,height:500},
      {width:1000,height:700},
      {top:56,right:8,bottom:8,left:8}
    ),
    {x:40,y:56}
  );
});

test("funções de transformação não mutam o estado recebido",()=>{
  const source={...towers[0]};
  const frozen=Object.freeze({...source});
  scaleTower(frozen,0.8);
  resizeTowerFromSnapshot(frozen,{x:180,y:140,w:80,h:60});
  increaseFloors(frozen,2);
  assert.deepEqual(frozen,source);
});

test("sequência extensa de resize continua determinística e dentro dos limites",()=>{
  const snapshot=towers[1];
  let result;
  for(let i=0;i<1000;i++){
    result=resizeTowerFromSnapshot(snapshot,{x:300,y:150,w:100,h:70});
  }
  assert.equal(result.units,99);
  assert.equal(result.area,6761);
  assert.ok(result.units<=LIMITS.units);
  assert.ok(result.area<=LIMITS.area);
});
