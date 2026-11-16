const vocab = [
 {word:"conformity",pos:"noun",def:"Behavior that follows accepted rules or standards.",ko:"순응, 획일성",example:"The novel questions a society built on conformity."},
 {word:"individuality",pos:"noun",def:"The qualities that make a person unique.",ko:"개성, 개인의 독자성",example:"Meg gradually learns to value her individuality."},
 {word:"resilience",pos:"noun",def:"The ability to recover after difficulty.",ko:"회복력, 끈기",example:"Meg shows resilience when she faces fear."},
 {word:"tesseract",pos:"noun",def:"A way of traveling through space by folding it.",ko:"테서랙트, 공간을 접는 방식",example:"The tesseract helps the characters travel across the universe."},
 {word:"oppression",pos:"noun",def:"Cruel or unfair control over a group or person.",ko:"억압",example:"The controlled world represents oppression."},
 {word:"compassion",pos:"noun",def:"Concern for another person's suffering and a wish to help.",ko:"연민, 동정심",example:"Compassion helps characters connect with others."},
 {word:"vulnerability",pos:"noun",def:"The state of being open to emotional or physical harm.",ko:"취약성, 약점이 드러날 수 있는 상태",example:"Accepting vulnerability can be part of courage."},
 {word:"alienation",pos:"noun",def:"A feeling of being isolated or separated from others.",ko:"소외감",example:"Meg experiences alienation at school and at home."},
 {word:"perfection",pos:"noun",def:"A state of being without any flaws.",ko:"완벽함",example:"The novel asks whether enforced perfection is desirable."},
 {word:"courage",pos:"noun",def:"The ability to face fear or difficulty.",ko:"용기",example:"Courage does not mean that Meg never feels afraid."},
 {word:"manipulation",pos:"noun",def:"Controlling someone or something in an unfair or clever way.",ko:"조종, 교묘한 통제",example:"The forces of control use manipulation to limit choice."},
 {word:"sacrifice",pos:"noun",def:"Giving up something important for another person or purpose.",ko:"희생",example:"The story explores sacrifice as an expression of love."}
];
const vocabGrid=document.getElementById('vocabGrid'), search=document.getElementById('vocabSearch');
function renderVocab(filter=""){const list=vocab.filter(v=>(v.word+" "+v.def+" "+v.ko).toLowerCase().includes(filter.toLowerCase()));vocabGrid.innerHTML=list.map(v=>`<article class="word-card"><span class="pos">${v.pos}</span><h3>${v.word}</h3><p>${v.def}</p><p class="meaning">${v.ko}</p><p><i>Example:</i> ${v.example}</p></article>`).join('')||'<p>No matching vocabulary found.</p>';document.getElementById('vocabCount').textContent=`${list.length} / ${vocab.length} words`;}
search.addEventListener('input',e=>renderVocab(e.target.value));renderVocab();

const questions=[
 {q:"At the beginning of the novel, how does Meg mainly see herself?",a:["As confident and popular","As different and misunderstood","As the smartest student in school","As uninterested in her family"],c:1,e:"Meg feels like an outsider and struggles with how others perceive her."},
 {q:"What is a central idea represented by Camazotz?",a:["The value of artistic freedom","The beauty of nature","The danger of enforced conformity and control","The importance of competition"],c:2,e:"Camazotz represents a society where sameness and control threaten individuality."},
 {q:"What does the tesseract make possible?",a:["Time travel only","Travel by folding space","Reading other people's minds","Becoming invisible"],c:1,e:"The tesseract is explained as a way to shorten distance by folding space."},
 {q:"Which statement best describes courage in the novel?",a:["Courage means never feeling fear","Courage requires physical strength only","Courage involves acting despite fear and uncertainty","Courage means obeying every authority"],c:2,e:"The characters often feel afraid, but they continue to act in difficult situations."},
 {q:"Which theme is most closely connected to Meg's final confrontation?",a:["Love and individuality can resist destructive control","Technology solves every problem","Being perfect is the highest goal","People should avoid emotional connections"],c:0,e:"Meg's love and acceptance of her own individuality become central to her resistance."}
];
let qIndex=0,chosen=null,score=0,answered=false;
const qText=document.getElementById('questionText'),opts=document.getElementById('answerOptions'),feedback=document.getElementById('feedback'),next=document.getElementById('nextQuestion');
function drawQuestion(){const q=questions[qIndex];chosen=null;answered=false;document.getElementById('questionProgress').textContent=`QUESTION ${qIndex+1} / ${questions.length}`;document.getElementById('progressBar').style.width=`${(qIndex+1)/questions.length*100}%`;qText.textContent=q.q;feedback.textContent='';next.disabled=true;next.textContent=qIndex===questions.length-1?'See results →':'Next question →';opts.innerHTML=q.a.map((a,i)=>`<button class="answer-option" data-index="${i}">${String.fromCharCode(65+i)}. ${a}</button>`).join('');opts.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>choose(Number(b.dataset.index))));}
function choose(i){if(answered)return;answered=true;chosen=i;const q=questions[qIndex];opts.querySelectorAll('button').forEach((b,j)=>{b.disabled=true;if(j===q.c)b.classList.add('correct');if(j===i&&i!==q.c)b.classList.add('incorrect');});if(i===q.c){score++;feedback.textContent='Correct! '+q.e;}else{feedback.textContent='Not quite. '+q.e;}next.disabled=false;}
next.addEventListener('click',()=>{if(!answered)return;if(qIndex<questions.length-1){qIndex++;drawQuestion();}else{qText.textContent=`You scored ${score} out of ${questions.length}.`;opts.innerHTML='<p>Review the explanations, revisit the lessons, and try again.</p>';feedback.textContent=score===5?'Excellent work!':'Keep practicing — you can improve your score.';next.disabled=true;next.textContent='Completed';document.getElementById('questionProgress').textContent='QUIZ COMPLETE';}});
document.getElementById('resetQuiz').addEventListener('click',()=>{qIndex=0;score=0;drawQuestion();});drawQuestion();

document.getElementById('openPpt').addEventListener('click',()=>{const file=document.getElementById('pptSelect').value;const msg=document.getElementById('pptMessage');if(!file){msg.textContent='Please select a lesson first.';return;}const raw=`https://raw.githubusercontent.com/bangsangyeol-star/Hello_Jeus-New/main/${file}`;const viewer=`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(raw)}`;window.open(viewer,'_blank','noopener');msg.textContent='If the preview does not load, use the Download PPT link on the lesson card.';});
document.getElementById('menuToggle').addEventListener('click',()=>document.getElementById('mainNav').classList.toggle('open'));
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('mainNav').classList.remove('open')));
let korean=false;document.getElementById('langToggle').addEventListener('click',()=>{korean=!korean;document.getElementById('langToggle').textContent=korean?'English 안내':'한국어 안내';document.body.classList.toggle('ko-focus',korean);document.querySelectorAll('.ko').forEach(el=>el.style.display=korean?'block':'');});
