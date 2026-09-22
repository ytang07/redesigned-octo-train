const briefForm = document.querySelector('#briefForm');
const topicInput = document.querySelector('#topic');
const audienceInput = document.querySelector('#audience');
const toneInput = document.querySelector('#tone');
const styleInputs = document.querySelectorAll('input[name="style"]');
const expertiseInputs = document.querySelectorAll('input[name="expertise"]');
const lengthInput = document.querySelector('#length');
const lengthValue = document.querySelector('#lengthValue');
const outlinePanel = document.querySelector('#outlinePanel');
const draftPanel = document.querySelector('#draftPanel');
const outlineTitle = document.querySelector('#outlineTitle');
const draftTitle = document.querySelector('#draftTitle');
const thesis = document.querySelector('#thesis');
const outlineList = document.querySelector('#outlineList');
const draftContent = document.querySelector('#draftContent');
const steps = document.querySelectorAll('.step');

let brief;
let outline;

const domainExpertise = {
  History: {
    theses: [
      (title, audience) => `${title} becomes clearer when we trace the historical forces that shaped it and examine what those patterns can teach ${audience.toLowerCase()} today.`,
      (title, audience) => `A historical view of ${title.toLowerCase()} helps ${audience.toLowerCase()} distinguish lasting lessons from assumptions rooted in a particular time and place.`,
    ],
    sections: (topic, audience) => [
      ['Set the historical scene', `Place ${topic.toLowerCase()} in its historical context and identify the conditions that made it matter.`],
      ['Follow the turning point', 'Examine a pivotal shift, including the people, institutions, or ideas that changed the prevailing approach.'],
      ['Draw the pattern forward', `Connect the historical evidence to the choices ${audience.toLowerCase()} face now without treating the past as a simple blueprint.`],
      ['Carry the lesson ahead', 'Close with one historically informed action readers can adapt to their own context.'],
    ],
    opening: (topic) => `History offers a useful lens on ${topic}: today’s assumptions were made over time, through choices and circumstances that can be examined.`,
    tension: 'Rather than assuming the current way is inevitable, look for the earlier incentives and turning points that made it seem normal.',
    reframe: 'A historical comparison adds perspective: it separates enduring principles from habits that belong to a particular moment.',
    practice: 'Use a specific precedent as a test case. Ask what conditions made it work, what changed afterward, and which lesson actually travels to the present.',
    close: 'The past does not supply a script, but it gives readers a better set of questions for making the next choice.',
  },
  Technology: {
    theses: [
      (title, audience) => `${title} is a practical leverage point for ${audience.toLowerCase()} when it is examined as a system of tools, constraints, and feedback loops.`,
      (title, audience) => `For ${audience.toLowerCase()}, ${title.toLowerCase()} is an opportunity to improve the workflow by making its trade-offs and feedback visible.`,
    ],
    sections: (topic, audience) => [
      ['Map the system', `Identify the tools, workflow, and constraints surrounding ${topic.toLowerCase()} for ${audience.toLowerCase()}.`],
      ['Find the point of friction', 'Show where the current process breaks down and what that costs in attention, reliability, or speed.'],
      ['Design a small experiment', 'Offer a lightweight change, clear success signal, and feedback loop readers can test.'],
      ['Make the improvement durable', 'Close with the safeguards that help a useful technical practice survive beyond its first trial.'],
    ],
    opening: (topic) => `A technology lens treats ${topic} as a system: tools, people, constraints, and feedback all shape the result.`,
    tension: 'The important question is not which tool is newest; it is where the current system creates friction or obscures useful feedback.',
    reframe: 'Design the workflow around observable signals, reasonable constraints, and a change small enough to evaluate.',
    practice: 'Run a bounded experiment, measure one meaningful outcome, and use the result to decide whether to iterate, integrate, or stop.',
    close: 'When the system makes the better action easier and visible, the improvement can compound instead of depending on enthusiasm.',
  },
  Math: {
    theses: [
      (title, audience) => `${title} gives ${audience.toLowerCase()} a stronger basis for action when the variables, assumptions, and evidence are made explicit.`,
      (title, audience) => `A mathematical model can turn ${title.toLowerCase()} from a vague preference into a question ${audience.toLowerCase()} can measure and test.`,
    ],
    sections: (topic, audience) => [
      ['Define the problem', `Turn ${topic.toLowerCase()} into a precise question by naming the quantities, constraints, and desired outcome.`],
      ['Check the assumptions', 'Surface the estimates and hidden assumptions that influence the conclusion before treating them as facts.'],
      ['Work through the model', 'Use a simple comparison or calculation to show how the important variables relate.'],
      ['Decide with the evidence', 'Close with a measurable next step and a way to update the decision when new information arrives.'],
    ],
    opening: (topic) => `A mathematical lens starts by making ${topic} measurable: define the variables, constraints, and trade-offs before choosing an answer.`,
    tension: 'Intuition is a useful starting point, but it can hide assumptions about scale, rates, and the trade-offs between outcomes.',
    reframe: 'A simple model is not a claim of certainty; it is a transparent way to test which assumptions drive the result.',
    practice: 'Choose one metric, estimate a baseline, and compare two plausible scenarios so readers can see what would change the decision.',
    close: 'Reasoning from explicit assumptions makes the next step easier to explain, measure, and revise as the evidence improves.',
  },
};

const blogStyles = {
  Funny: {
    intro: (topic, audience) => `${topic} is the kind of thing ${audience} can mean to tackle right after they answer one more message, reorganize their tabs, and solve email forever. But it deserves better than the productivity equivalent of finger-crossing.`,
    tension: 'The default approach is familiar because it is easy to postpone, not because it works. That is a mildly inconvenient distinction—and a useful place to begin.',
    reframe: 'Treat this as a design question, not a character test. A better system should not require a heroic montage or a color-coded spreadsheet with its own calendar invite.',
    practice: (tone) => `Start smaller than you think: protect one moment, simplify one decision, and choose one signal that shows the approach is helping. A ${tone} approach works best when it leaves room for being human.`,
    close: (topic) => `The durable changes are rarely flashy. They show up as calmer decisions and fewer “how did it get this late?” moments. Try one experiment around ${topic}, then let it earn a permanent spot in your routine.`,
  },
  Serious: {
    intro: (topic, audience) => `${topic} can sound like one more item on an already crowded list. But for ${audience}, the way we approach it quietly shapes the quality of our work. The goal is not to add another rule. It is to make room for the choices that matter most.`,
    tension: 'Most people recognize the problem before they can name it. The default approach feels efficient because it is familiar, yet it often creates more noise than progress. That tension is worth examining, because it reveals where a small change can have an outsized effect.',
    reframe: 'Instead of treating this as a matter of willpower, treat it as a design question. What would make the better choice obvious, easy, and repeatable? This shift replaces vague intention with a standard that can guide day-to-day decisions.',
    practice: (tone) => `Start smaller than you think. Choose one moment in the week to protect, one decision to simplify, and one signal that tells you the new approach is working. A ${tone} approach is not about finding a perfect system; it is about learning through consistent practice.`,
    close: (topic) => `The most durable changes rarely announce themselves. They show up as calmer decisions, clearer priorities, and better work over time. Begin with a single experiment around ${topic}, then give it long enough to become part of how you work.`,
  },
  Persuasive: {
    intro: (topic, audience) => `${topic} is not an optional refinement for ${audience}; it is a practical advantage. The teams and individuals who address it deliberately make clearer decisions, protect more valuable work, and avoid paying the same hidden costs each week.`,
    tension: 'The default approach may feel efficient, but familiar friction has a cost: it drains attention, delays better decisions, and keeps meaningful progress out of reach. Leaving it unchanged is still a choice.',
    reframe: 'The better alternative is to design for the behavior you need. Make the right choice visible, reduce the effort needed to act on it, and create a repeatable standard for evaluating progress.',
    practice: (tone) => `Start now with one protected moment, one simplified decision, and one measure of progress. A ${tone} approach turns a good intention into evidence that the change is working.`,
    close: (topic) => `The case for acting on ${topic} is straightforward: small, deliberate changes compound into stronger priorities and better work. Choose one experiment today and give it the consistency needed to prove its value.`,
  },
};

lengthInput.addEventListener('input', () => {
  lengthValue.textContent = `${lengthInput.value} words`;
});

function titleCase(value) {
  return value.trim().replace(/\.$/, '').replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}

function setStep(step) {
  steps.forEach((item) => item.classList.toggle('active', Number(item.dataset.step) <= step));
}

function createOutline() {
  const title = titleCase(brief.topic);
  const domain = domainExpertise[brief.expertise];
  return {
    title,
    thesis: domain.theses[Math.floor(Math.random() * domain.theses.length)](title, brief.audience),
    sections: domain.sections(brief.topic, brief.audience),
  };
}

function renderOutline() {
  outlineTitle.textContent = outline.title;
  thesis.textContent = outline.thesis;
  outlineList.innerHTML = outline.sections.map(([heading, description], index) => `
    <div class="outline-item">
      <span class="outline-number">0${index + 1}</span>
      <div><h3>${heading}</h3><p>${description}</p></div>
    </div>`).join('');
}

function createDraft() {
  const [first, second, third, fourth] = outline.sections;
  const topic = brief.topic.trim().replace(/\.$/, '');
  const audience = brief.audience.toLowerCase();
  const style = blogStyles[brief.style];
  const domain = domainExpertise[brief.expertise];
  return `
    <p>${domain.opening(topic)} ${style.intro(topic, audience)}</p>
    <h3>${first[0]}</h3>
    <p>${domain.tension} ${style.tension}</p>
    <h3>${second[0]}</h3>
    <p>${domain.reframe} ${style.reframe}</p>
    <h3>${third[0]}</h3>
    <p>${domain.practice} ${style.practice(brief.tone.toLowerCase())}</p>
    <h3>${fourth[0]}</h3>
    <p>${domain.close} ${style.close(topic.toLowerCase())}</p>`;
}

briefForm.addEventListener('submit', (event) => {
  event.preventDefault();
  brief = {
    topic: topicInput.value,
    audience: audienceInput.value,
    tone: toneInput.value,
    style: [...styleInputs].find((input) => input.checked).value,
    expertise: [...expertiseInputs].find((input) => input.checked).value,
    length: lengthInput.value,
  };
  outline = createOutline();
  renderOutline();
  outlinePanel.classList.remove('is-hidden');
  draftPanel.classList.add('is-hidden');
  setStep(2);
  outlinePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelector('#refreshOutline').addEventListener('click', () => {
  outline = createOutline();
  renderOutline();
});

document.querySelector('#editBrief').addEventListener('click', () => {
  document.querySelector('#briefPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelector('#generateDraft').addEventListener('click', () => {
  draftTitle.textContent = outline.title;
  draftContent.innerHTML = createDraft();
  draftPanel.classList.remove('is-hidden');
  setStep(3);
  draftPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelector('#backToOutline').addEventListener('click', () => {
  outlinePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelector('#copyDraft').addEventListener('click', async () => {
  const markdown = `# ${outline.title}\n\n${draftContent.innerText.trim()}`;
  await navigator.clipboard.writeText(markdown);
  const button = document.querySelector('#copyDraft');
  button.textContent = 'Copied';
  setTimeout(() => { button.textContent = 'Copy as Markdown'; }, 1600);
});

document.querySelector('#startOver').addEventListener('click', () => {
  briefForm.reset();
  lengthInput.value = 700;
  lengthValue.textContent = '700 words';
  outlinePanel.classList.add('is-hidden');
  draftPanel.classList.add('is-hidden');
  setStep(1);
  topicInput.focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
