// 多言語タイピングエフェクト
const typingText = document.querySelector(".typing-text");
const texts = [
  "こんにちは、たつプロです。",
  "Hello, I am TatsuPro.",
  "你好，我是たつプロ。",
  "Bonjour, je suis TatsuPro.",
  "안녕하세요, 타츠프로.",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    // タイピング中
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      // 表示完了、2秒待機後に削除開始
      setTimeout(() => {
        isDeleting = true;
        typeWriter();
      }, 2000);
      return;
    }
    setTimeout(typeWriter, 100);
  } else {
    // 削除中
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      // 削除完了、次のテキストへ
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeWriter, 500);
      return;
    }
    setTimeout(typeWriter, 50);
  }
}

// ページ読み込み後に開始
setTimeout(typeWriter, 500);

// ナビバーのスクロール効果
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});

// セクションのフェードイン
const sections = document.querySelectorAll("section");
const revealSection = () => {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealSection);
revealSection();

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});
