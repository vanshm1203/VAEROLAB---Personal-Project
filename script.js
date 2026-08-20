const menuBtn=document.querySelector("#menuBtn"),mobileMenu=document.querySelector("#mobileMenu");
menuBtn.addEventListener("click",()=>mobileMenu.classList.toggle("mobile-open"));
document.querySelectorAll("#mobileMenu a").forEach(a=>a.addEventListener("click",()=>mobileMenu.classList.remove("mobile-open")));

const labels=[
["Leading Edge","The front of the airfoil that first meets the airflow."],
["Trailing Edge","The rear edge where the upper and lower airflow paths come together."],
["Camber","The curvature of the airfoil. A cambered airfoil can generate lift at zero angle of attack."],
["Chord Line","The straight reference line from the leading edge to the trailing edge."],
["Maximum Thickness","The greatest distance between the upper and lower surfaces."],
["Angle of Attack","The angle between the chord line and incoming airflow."]
];
const labelBox=document.querySelector("#labelButtons"),title=document.querySelector("#labelTitle"),desc=document.querySelector("#labelDesc");
function selectLabel(i){title.textContent=labels[i][0];desc.textContent=labels[i][1];document.querySelectorAll(".label-btn").forEach((b,j)=>b.classList.toggle("active",i===j))}
labels.forEach((item,i)=>{const b=document.createElement("button");b.className="label-btn";b.textContent=item[0];b.onclick=()=>selectLabel(i);labelBox.appendChild(b)});selectLabel(2);

const foils=[
{name:"Symmetrical",type:"BALANCED",image:"images/naca0012.png",desc:"The upper and lower surfaces are symmetrical and it produces approximately zero lift at zero angle of attack.",adv:["Predictable behaviour","Works well when inverted"],dis:["Needs positive angle of attack for lift","Less efficient for normal cruise"],uses:"Aerobatic aircraft, tail surfaces and rotor applications."},
{name:"Cambered",type:"EFFICIENT",image:"images/naca2412.png",desc:"A moderately curved profile that can generate lift at zero angle of attack.",adv:["Good lift-to-drag ratio","Efficient for general flight"],dis:["Less suitable when inverted","More difficult to construct"],uses:"General aviation and light aircraft."},
{name:"High Camber",type:"HIGH LIFT",image:"images/high-camber.png",desc:"A strongly curved profile designed to produce high lift, especially at lower speeds.",adv:["High lift potential","Useful for slow flight"],dis:["Higher drag","Lower high-speed efficiency"],uses:"STOL aircraft, gliders and high-lift applications."}
];
document.querySelector("#airfoilCards").innerHTML=foils.map(f=>`<article class="card"><div class="card-image"><img src="${f.image}" alt="${f.name}"></div><div class="card-body"><p class="number">${f.type}</p><h3>${f.name}</h3><p>${f.desc}</p><dl><dt>Advantages</dt><dd>+ ${f.adv[0]}<br>+ ${f.adv[1]}</dd><dt>Disadvantages</dt><dd>− ${f.dis[0]}<br>− ${f.dis[1]}</dd><dt>Used for</dt><dd>${f.uses}</dd></dl></div></article>`).join("");

const questions=[
["Which force acts opposite to lift?",["Thrust","Drag","Weight","Camber"],2],
["As fluid speed increases, pressure generally…",["increases","stays constant","decreases","doubles"],2],
["Newton's third law helps explain lift because…",["Air is deflected downward","Gravity disappears","The wing creates fuel","Drag becomes zero"],0],
["Which part first meets the airflow?",["Trailing edge","Chord line","Leading edge","Camber"],2],
["Angle of attack is measured between…",["Wing and horizon","Chord line and incoming airflow","Upper and lower surface","Wing and fuselage"],1],
["NACA 0012 is…",["Highly cambered","Symmetrical","A flat plate","Supercritical"],1],
["Aerodynamic drag is approximately proportional to…",["Speed","Speed²","Weight","√Speed"],1],
["Why are efficient wings useful for gliders?",["Higher top speed","High lift-to-drag ratio","They fly inverted","They eliminate gravity"],1],
["Winglets can reduce…",["Thrust","Induced drag","Weight","Fuel temperature"],1],
["In steady level flight, lift balances…",["Drag","Thrust","Weight","Zero"],2]
];
let answers=Array(questions.length).fill(null);
function renderQuiz(){const box=document.querySelector("#quizBox");box.innerHTML=questions.map((q,i)=>`<div class="quiz-q"><p>${i+1}. ${q[0]}</p><div class="options">${q[1].map((o,j)=>`<button class="option ${answers[i]===j?"selected":""}" onclick="choose(${i},${j})">${String.fromCharCode(65+j)}. ${o}</button>`).join("")}</div></div>`).join("")+`<button class="quiz-submit" onclick="submitQuiz()" ${answers.includes(null)?"disabled":""}>Submit Answers</button><p style="margin-top:10px;color:#b7c5d9">${answers.filter(x=>x!==null).length} / ${questions.length} answered</p>`}
window.choose=(i,j)=>{answers[i]=j;renderQuiz()};
window.submitQuiz=()=>{let score=questions.reduce((s,q,i)=>s+(answers[i]===q[2]?1:0),0);document.querySelector("#quizBox").innerHTML=`<div class="quiz-result"><p class="number">YOUR SCORE</p><div class="score">${score} / 10</div><p>${score>=8?"Excellent understanding of the fundamentals.":score>=5?"Good understanding. Review a few sections and try again.":"Review the earlier sections and try again."}</p>${questions.map((q,i)=>`<div class="result-item"><strong>${answers[i]===q[2]?"✓":"✕"} ${q[0]}</strong><br>Correct answer: <strong>${q[1][q[2]]}</strong></div>`).join("")}<button class="quiz-submit" onclick="resetQuiz()">Retake Quiz</button></div>`};
window.resetQuiz=()=>{answers=Array(questions.length).fill(null);renderQuiz()};renderQuiz();
const processNumbers = document.querySelectorAll('.process span');

const sections = [
    document.querySelector('#home'),
    document.querySelector('#principles'),
    document.querySelector('#airfoils'),
    document.querySelector('#investigation'),
    document.querySelector('#applications'),
    document.querySelector('#quiz')
];

function updateProcess() {
    let active = 0;

    sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top < window.innerHeight * 0.5) {
            active = index;
        }
    });

    processNumbers.forEach((number, index) => {
        number.classList.toggle('active', index <= active);
    });
}

window.addEventListener('scroll', updateProcess);
updateProcess();