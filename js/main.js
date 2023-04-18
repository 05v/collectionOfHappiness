class GetData {
  static async getData() {
    const response = await fetch("../data/data.json");
    return await response.json();
  }
}

class Header {
  constructor() {
    this.element = this.createHeaderElement();
  }
  createHeaderElement() {
    const header = document.createElement("header");
    header.classList.add("header");
    const logo = document.createElement("div");
    logo.classList.add("header__logo");
    const icon = document.createElement("i");
    icon.classList.add("header__icon", "fa-solid", "fa-face-smile"),
      logo.appendChild(icon);
    const title = document.createElement("h1");
    return (
      title.classList.add("header__title"),
      (title.textContent = "Collection of Happiness"),
      logo.appendChild(title),
      header.appendChild(logo),
      header
    );
  }
}

class LeftPanel {
  constructor(rightPanel) {
    this.rightPanel = rightPanel;
    this.element = null;
  }

  async init() {
    this.data = await GetData.getData();
  }

  async createLeftPanel(rightPanel) {
    const leftPanel = document.createElement("div");
    leftPanel.classList.add("main__left");

    await this.init();

    const episodeIndices = [0, 1, 2, 3, 4, 5];

    for (let i = episodeIndices.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [episodeIndices[i], episodeIndices[random]] = [
        episodeIndices[random],
        episodeIndices[i],
      ];
    }

    const panel1Episode = this.data.episodes[episodeIndices[0]];
    const panel2Episode = this.data.episodes[episodeIndices[1]];
    const panel3Episode = this.data.episodes[episodeIndices[2]];
    const panel4Episode = this.data.episodes[episodeIndices[3]];

    const panel1ImgSrc = this.getImageSrc(panel1Episode.title);
    const panel2ImgSrc = this.getImageSrc(panel2Episode.title);
    const panel3ImgSrc = this.getImageSrc(panel3Episode.title);
    const panel4ImgSrc = this.getImageSrc(panel4Episode.title);

    this.episodes = [
      {
        imgSrc: panel1ImgSrc.square,
        cover: panel1ImgSrc.cover,
        alt: panel1Episode["title"],
        date: panel1Episode["date (dd-mm-yyyy)"],
        title: panel1Episode["title"],
        summary: panel1Episode["summary"],
        audio: panel1Episode["audio"],
        sourceURL: panel1Episode["url"],
      },
      {
        imgSrc: panel2ImgSrc.square,
        cover: panel2ImgSrc.cover,
        date: panel2Episode["date (dd-mm-yyyy)"],
        title: panel2Episode["title"],
        summary: panel2Episode["summary"],
        audio: panel2Episode["audio"],
        sourceURL: panel2Episode["url"],
      },
      {
        imgSrc: panel3ImgSrc.square,
        cover: panel3ImgSrc.cover,
        date: panel3Episode["date (dd-mm-yyyy)"],
        title: panel3Episode["title"],
        summary: panel3Episode["summary"],
        audio: panel3Episode["audio"],
        sourceURL: panel3Episode["url"],
      },
      {
        imgSrc: panel4ImgSrc.square,
        cover: panel4ImgSrc.cover,
        date: panel4Episode["date (dd-mm-yyyy)"],
        title: panel4Episode["title"],
        summary: panel4Episode["summary"],
        audio: panel4Episode["audio"],
        sourceURL: panel4Episode["url"],
      },
    ];

    this.episodes.forEach((episode) => {
      const card = document.createElement("div");
      card.classList.add("main__card");

      const image = document.createElement("div");
      image.classList.add("main__card__image");

      const img = document.createElement("img");
      img.src = episode.imgSrc;
      img.alt = episode.alt;
      image.appendChild(img);

      const date = document.createElement("div");
      date.classList.add("main__card__date");
      date.textContent = episode.date;
      image.appendChild(date);

      const title = document.createElement("div");
      title.classList.add("main__card__title");
      title.textContent = episode.title;
      image.appendChild(title);

      card.appendChild(image);

      card.addEventListener("click", () => {
        this.rightPanel.updateDetailCard(
          episode.title,
          episode.date,
          episode.summary,
          episode.audio,
          episode.sourceURL,
          episode.cover
        );
      });

      leftPanel.appendChild(card);
    });

    return leftPanel;
  }
  getImageSrc(title) {
    let imgSrc = {
      square: "https://placehold.co/250x250",
      cover: "https://placehold.co/700x200",
    };

    if (title === "Why We Need Friends with Shared Interest") {
      imgSrc.square = "../assets/friendsSquare.webp";
      imgSrc.cover = "../assets/friendsCover.webp";
    } else if (title === "One Way to Make Work More Meaningful") {
      imgSrc.square = "../assets/workSquare.webp";
      imgSrc.cover = "../assets/workCover.webp";
    } else if (title === "How Music Evokes Awe") {
      imgSrc.square = "../assets/musicSquare.webp";
      imgSrc.cover = "../assets/musicCover.webp";
    } else if (title === "Why We Need Reminders of Connectedness") {
      imgSrc.square = "../assets/connectednessSquare.webp";
      imgSrc.cover = "../assets/connectednessCover.webp";
    } else if (title === "Why We Should Look Up At the Sky") {
      imgSrc.square = "../assets/look_upSquare.webp";
      imgSrc.cover = "../assets/look_upCover.webp";
    } else if (
      title === "How to Practice Gratitude When You're Not Feeling Thankful"
    ) {
      imgSrc.square = "../assets/gratitudeSquare.webp";
      imgSrc.cover = "../assets/gratitudeCover.webp";
    } else if (title === "How to Focus Under Pressure") {
      imgSrc.square = "../assets/focus_pressureSquare.webp";
      imgSrc.cover = "../assets/focus_pressureCover.webp";
    }

    return imgSrc;
  }
}

class RightPanel {
  constructor() {
    this.detailCard = new DetailCard();
    this.element = this.createRightPanel();
  }

  createRightPanel() {
    const rightPanel = document.createElement("div");
    rightPanel.classList.add("main__right");
    rightPanel.appendChild(this.detailCard.element);
    return rightPanel;
  }

  updateDetailCard(title, date, summary, audioSrc, sourceURL, cover) {
    this.detailCard.update(title, date, summary, audioSrc, sourceURL, cover);
  }
}

class Footer {
  constructor() {
    this.element = this.createFooterElement();
  }
  createFooterElement() {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    const info = document.createElement("div");
    return (
      info.classList.add("footer__info"),
      (info.textContent = "Gemaakt door - Vlad Verheij SD2D Mediacollege"),
      footer.appendChild(info),
      footer
    );
  }
}

class DetailCard {
  constructor() {
    this.element = this.createDetailCard();
  }

  createDetailCard() {
    const detailCard = document.createElement("div");
    detailCard.classList.add("main__detail");

    const card = document.createElement("div");
    card.classList.add("main__card");

    const image = document.createElement("div");
    image.classList.add("main__card__image");

    const img = document.createElement("img");
    img.src = "https://placehold.co/700x200";
    img.alt = "";
    image.appendChild(img);

    const dateEl = document.createElement("div");
    dateEl.classList.add("main__card__date");
    image.appendChild(dateEl);

    const titleEl = document.createElement("div");
    titleEl.classList.add("main__card__title");
    image.appendChild(titleEl);

    card.appendChild(image);
    detailCard.appendChild(card);

    const summary = document.createElement("div");
    summary.classList.add("main__right__summary");
    summary.textContent =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quae veniam doloremque quod sit illum quo dolorem nihil voluptates iure eaque ducimus ullam quis culpa molestiae, expedita deleniti natus. Sequi.";
    detailCard.appendChild(summary);

    const rightWrapper = document.createElement("div");
    rightWrapper.classList.add("main__rightWrapper");

    const audio = document.createElement("div");
    audio.classList.add("main__audio");

    const audioElement = document.createElement("audio");
    audioElement.controls = true;

    const audioSource = document.createElement("source");
    audioSource.src = "";
    audioSource.type = "audio/mpeg";
    audioElement.appendChild(audioSource);
    audio.appendChild(audioElement);
    rightWrapper.appendChild(audio);

    const source = document.createElement("div");
    source.classList.add("main__source");

    const sourceLink = document.createElement("a");
    sourceLink.href = "#";
    sourceLink.textContent = "Source";
    source.appendChild(sourceLink);
    rightWrapper.appendChild(source);

    detailCard.appendChild(rightWrapper);

    return detailCard;
  }

  update(title, date, summary, audioSrc, sourceURL, cover) {
    const image = this.element.querySelector(".main__card__image");
    const titleEl = image.querySelector(".main__card__title");
    const dateEl = image.querySelector(".main__card__date");

    image.querySelector("img").alt = title;
    titleEl.textContent = title;
    dateEl.textContent = date;

    const coverImage = this.element.querySelector(".main__card__image img");
    coverImage.src = cover;

    const summaryElement = this.element.querySelector(".main__right__summary");
    summaryElement.innerText = summary;

    const sourceElement = this.element.querySelector(".main__source a");
    sourceElement.href = sourceURL;
    sourceElement.target = "_blank";

    const audio = this.element.querySelector(".main__audio audio");
    const audioSource = audio.querySelector("source");
    audioSource.src = audioSrc;
    audio.load();
  }
}

class App {
  constructor() {
    (this.data = null),
      (this.rightPanel = new RightPanel()),
      (this.leftPanel = new LeftPanel(this.rightPanel)),
      (this.footer = new Footer()),
      (this.header = new Header()),
      (this.main = this.createMainElement()),
      this.init();
  }
  async init() {
    this.data = await GetData.getData();

    document.body.appendChild(this.header.element);

    this.leftPanel.element = await this.leftPanel.createLeftPanel(
      this.rightPanel
    );

    document.body.appendChild(this.main);
    document.body.appendChild(this.footer.element);
    this.main.appendChild(this.leftPanel.element);
    this.main.appendChild(this.rightPanel.element);

    const firstEpisodeCard =
      this.leftPanel.element.querySelector(".main__card");
    if (firstEpisodeCard) {
      firstEpisodeCard.click();
    }
  }
  createMainElement() {
    const main = document.createElement("main");
    return main.classList.add("main"), main;
  }
}
const app = new App();
