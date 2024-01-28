anime({
    targets: '.slide',
    opacity: [0, 1], // From 0 (transparent) to 1 (fully visible)
    easing: 'easeInOutQuad',
    duration: 1000,
  });

  anime({
    targets: '.vertical',
    translateY: [/* From */ '-100px', /* To */ '0'],
    easing: 'easeInOutQuad',
    duration: 1000,
  });