const briefForm = document.querySelector('#briefForm');
const topicInput = document.querySelector('#topic');
const audienceInput = document.querySelector('#audience');
const toneInput = document.querySelector('#tone');
const styleInputs = document.querySelectorAll('input[name="style"]');
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
  const options = [
    {
      thesis: `${title} is not just a nice-to-have for ${brief.audience.toLowerCase()}; it is a practical way to make better decisions and create work with more intention.`,
      sections: [
        ['Start with the tension', `Open with the familiar friction around ${brief.topic.toLowerCase()} and show why the usual approach falls short.`],
        ['Name what matters', `Explain the underlying principle in clear terms, grounded in the daily reality of ${brief.audience.toLowerCase()}.`],
        ['Make it practical', 'Offer a simple framework with concrete actions readers can test this week.'],
        ['Protect the habit', 'Close by showing how small, repeatable choices turn a good idea into a durable practice.'],
      ],
    },
    {
      thesis: `The most useful way to think about ${title.toLowerCase()} is as a leverage point: a focused change that improves how ${brief.audience.toLowerCase()} work, decide, and grow.`,
      sections: [
        ['The hidden cost of the default', `Show what happens when ${brief.topic.toLowerCase()} is treated as an afterthought.`],
        ['A better lens', 'Reframe the topic around leverage, clarity, and the compounding value of better choices.'],
        ['Three moves to begin', 'Share three small but meaningful shifts readers can use immediately.'],
        ['The long view', 'End with an invitation to build a system that makes the desired behavior easier over time.'],
      ],
    },
  ];
  const choice = options[Math.floor(Math.random() * options.length)];
  return { title, ...choice };
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
  return `
    <p>${style.intro(topic, audience)}</p>
    <h3>${first[0]}</h3>
    <p>${style.tension}</p>
    <h3>${second[0]}</h3>
    <p>${style.reframe}</p>
    <h3>${third[0]}</h3>
    <p>${style.practice(brief.tone.toLowerCase())}</p>
    <h3>${fourth[0]}</h3>
    <p>${style.close(topic.toLowerCase())}</p>`;
}

briefForm.addEventListener('submit', (event) => {
  event.preventDefault();
  brief = {
    topic: topicInput.value,
    audience: audienceInput.value,
    tone: toneInput.value,
    style: [...styleInputs].find((input) => input.checked).value,
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
