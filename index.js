const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

var xscale = 1;
var yscale = 1;
var xPrev = 0;
var yPrev = 1;
var timeout;

function cursor(xscale, yscale) {
  window.addEventListener("mousemove", (dets) => {
    document.querySelector("#cursor").style.transform = `translate(${
      dets.clientX - 7
    }px, ${dets.clientY - 7}px) scale(${xscale}, ${yscale})`;
  });
}

function homePageAnimation() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  }).to(".boundingElem", {
    y: 0,
    ease: Expo.easeOut,
    stagger: 0.4,
    duration: 2.5,
    delay: -1,
  });

  // .to("#hero-footer", {
  //   y: 0,
  //   opacity: 0,
  //   duration: 1.5,
  //   ease: Expo.easeOut,
  //   delay: -1,
  // });
}

function cursorSkew() {
  window.addEventListener("mousemove", (dets) => {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.4, 1.5, dets.clientX - xPrev);
    yscale = gsap.utils.clamp(1, 1.2, dets.clientY - yPrev);

    xPrev = dets.clientX;
    yPrev = dets.clientY;

    cursor(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector("#cursor").style.transform = `translate(${
        dets.clientX - 7
      }px, ${dets.clientY - 7}px) scale(1, 1)`;
    }, 100);
  });
}

gsap.from("#hero-footer", {
  y: 10,
  opacity: 0,
  delay: 2,
});

cursor();
homePageAnimation();
cursorSkew();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;
  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientX - elem.getBoundingClientRect().left;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientsX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.2),
      left: dets.clientX - 200,
    });
  });

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      duration: 0.5,
      ease: Power3,
    });
  });
});
