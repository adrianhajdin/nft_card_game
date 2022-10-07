/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
const mp3explosion = 'data:audio/mp3;base64, SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjIzLjEwNgAAAAAAAAAAAAAA//tQwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAVAAAR9AAXFxcXIiIiIiIuLi4uLjo6Ojo6RUVFRVFRUVFRXV1dXV1oaGhoaHR0dHR/f39/f4uLi4uLl5eXl5eioqKirq6urq66urq6usXFxcXF0dHR0d3d3d3d6Ojo6Oj09PT09P////8AAAAATGF2YzU2LjI2AAAAAAAAAAAAAAAAJAAAAAAAAAAAEfQPir+jAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7UMQAAAesTXWUEQAB0Cax9xJgAIAmSBEChCsoAVlAAAMBzvQhPk6nABAIZRxQEHVAgc+CAIflAfD+CYP/EDuJz8EDn+JwfxACAIA+H/7v5cMX3/atyaNuaJIpopBEkkTIEkpHIyHhKKEBwjlZEooYmQWKyg8LOBtrmyj6RSskCVR4oSAoaBJFDHRLfthP3/pRzeZ+bkOlW/GLLr+nfGzd9tn+N6zfr3/sXnfc//b/P/4/a3z+Nf9jw9eqhtp2f+PObtP//Qp5nLV1dBt2QCf/+1LEBIALsLuH3PMAAXIXcLj2DSBG9oxBwJFDSakFRTVOvqQ81KyqgwLBAAUAqR/bTnRT0nhhrnTMa/9Y301REzNfMzP61r6zHbXZ/3d27loY5rixlMpALT+7cSU9g/23etGxXy6WfpkWd8mHI2NlVFJy8NN6ZJnBeGmokWUA/bDkdcODp5s5TYdHzNt1fNhkjrwXXPhaRkMicpTSeROzRye4X/9coRijFmz1joSKHd29rwEz3vUsevoCS0lf3DPWLtBVlml2aapjJCZUqR9lxf/7UsQFgAug3YPHsGPBeJvwOMGKaCSDGxmHQcEsUOl9EeCOsPiS2dVu69FHOyCEbFHaHtYnn9EW4gHlYx/zt1e5Nnp/xbm+5J//eER64UDsmqz6wdSKcsKkSRo73NCsvs1vq+cPhehkWJZUIiZQVQHiKPJMDtaMAlCMcF5HdVDy28YqUjeqe1m8QPFA3UMgMKJIDX6lpOyIDFWvTL2bjO+63W/s9mazPenohlKSwyFd4+HQC5vpst+o8JY/nlMj+5rWWdUR1Vd5qFMjJRm+UZ3C//tSxAWAC2xpg8ekZ8FxknD89hSw3FsN0oCdJEEVmALiCJXTAdZQPiI3v/ulrlM8tGVcKO0v8e0PExwOhR0BhgHgTCgIDLxdjwojqSw8HjQZ8USOPWJsYaFUI0Srpj2sYhH2AHNqz1LwhKQZblcpfYT00zgKMshITlC4iD0vKpdwzYhX+eNv/ZYw+6pFyGanzbruCkMd1+zoMEyguh9QKoAMmSF3jjo4UY5LHzKFqZyMhEMlzTjTBbRVOVaSJOKMPa1DZrZhAhVr6h6FAyGOaZ7/+1LEB4AL+N9/x7BpAYGXb3D2DLBFvZlSI8NQ7hMX4X1pNPYDTYDhtlKoUtUCkY4plCvlO6MRSuwl2yMlbJRIWg0b/P8rfMeEacSc7vLinFEJUJxlYlv8E4W9cOvjNrEiES3diq4prWymJ0ym+TY9z2KR6wLCQB9WVzM8Kw7J4yk8emkN4mEUW0CIzjh3ojGNkq/rnTAgw4ijQwz5+eNpSe2Uv9E3IKCD4gbjBECsPBVzow0lJFKEwOclH26NnrThpXrASfeqLXlJKAVdsJQSCv/7UsQFAAss93uGDFOBfJevcPMJ+IDgjkM0CVMS1gjQlBHWIo+8YQPWSvtkXk7YIKNLPzSpGREy3LpfFIFcIqkcdy/58gpQ4wpS2OvZk9Gd79ncZ4oEbztqBCQZ/2a6uruYLPJRTZokLr6uHqLkTRzL0jD0NM0GVzN9RL9nTC1hWWA0z67eaRePtU98vdbf2z0+hDBbEJx5/ny8GjJu9uvPZd/O1A5pEta5Tjulbyj0O5ses+FxduogAzgu9uWV7ufUfrpVgVFmN4l4/HRpwULU//tSxAaACiSPdQeYUMFADu7ynoAAbO0uTMh7YwulGpGBPyQxKGSt98ZsR7PrRH1mTdnu5RIwkEib3yKLOH2izeFDw5bXaRQgh/ZF0jSnprt84Ov/Yx366PSlrWCYQJZAySCC3ymmYZFJ52TlkU+k66cnBfAldGixNC9LcraD7ZjVVHpf/ikqJcg5gYDzDJcToYtNbnBoF2OdwaHDwmtrqJWoU9ff93//9VUCAaSTrcoGKf9ZiwM3DT8abWrDU9D8OG2UxSQkwqKBZhVlzKz01l7/+1LEE4APNKlsGYSAAVAYbmeegAApE01UONtJ4xcp0qzODbToxZZfOvJdrYVGqmlGTUXPEohwcBYFioGadEWJSoq0PmXBHVSDTDsGRQWSCJ4sTErDAiF3Hs7hxwuXNJGCrCv/9H/8+jLaM1VAcpDx0EgRg3U0mmJSzRkewSMEBzEdg0IzDx6lrHihrjDxZKJXjh54h1u5Qeco/XZFTuicup6tIv/9r7iO6HNvCc4ASJ4/U+qAaNrmf///YgE2oSiANKn+RRCg3RLMxfi2n+0s5//7UsQKgAp0TW+U9IABsJasQzSQAPNBxQGBiWxCsnhGtBOd92X3TrtERw9KhMosODQsdL1gECh0BiJqxihg4GRLJwykaxUikwzeyzzK4t6KP0f/cNil3AhI44Gxo+w1KU+F+stiVLOsidmjdEgmFQMCp+1I2JhSQyRNLsxGER8xMiRb5VnKokyPJSW62+N7J7SaVNy/Wj6/+f5GS9mTzQVpugyIDQSF5V38yKsNBK3/7XBU4aFibt+zX/+Bhb/+WgGAAOAJFGGEAB14ChoSddQr//tSxAiADEipXzmlgAF9mSsDNNAAlehfBLj7/3mXRSzX+CACWke8dwbgoSUVvzpCj+aJOfX+bEwbxtHdx7f/LGSfN0Ii5mv/2rH2HjgPMO+VBgIgcI2L/DaQGLIb/81Qx7Bv//SAyv15T0jZqcYwQ/7dxQNlX/Vl6qrGseaAI8IP1pqE8Lo4vNDRONIko0Dv+gt3Zy6ZDuK/72aSCj6JdOf7fM1mjpImH39QOAIXBP/5pQOCMaz//LiQ+LCMMAUJf///+HzNAFw2Fw2Gw2AwGAz/+1LEBYAL7LVzuPWAAXCPLPMykAAGAoBFbFkU5ITLZLBqDOc39IZIxbJ6H3EIEj8VsHwyI7IYyuBoDySm7O+KZmpKKSShT7m//3qqJvW766//3vYfcG/8CgZoMs/6hIKnDSf/5h8AsULgABEQJtwBhghpphhKy/iufQGKd99d89xIrKZb/GXOCqyxYKigtFL+w20JVqlv39ERLoK8ff//xplCkExntMhU9t4oaBZpUlLesEwZFBIWrnXfMrFUW2f/qTW24VUgQGAQCAwCAQCAQP/7UsQFgAvAY2u5hIABfZOvdx5gAAAQAFnhgRMYCFErPddxok/268ExyI00vwRGxUhHyCKaB7TLPUFb2WntObcxGdTYZDoDAkHQKYAwnEgXBB5kIAIAsFxUWuQTiiKPrKf7vu3/v//pAH3c0ku8uk0vl0GAwGJU8HjFcZx6U6xYK4vD+ar1ZegMgeaYQIYfpmBCQhK0oI+cIBdzXub+u3tPcv7nx5/7amp7IQ9jAvY8UBA+YQhHy7wfeH//nCjlGf/+gPw+5EQKB+SVw3GmGEuK//tSxASACpyZYhmUAAGLISuDNKAAmh6tI3/TCiMaf5/5+86RKuLgpEVpU9JDoOQarKq5naCCHtaksxiZiSSTa8M36JWhsZIdPFhKimEjwigr3+q/lv/6/lv/q2/////aLmfggQAAz0HEXewoO+NPGbXsoXfbvb4CoC1yTE4WhCkZr8QwLQkjBnMXyIXiQQDdnQ78aFickFkfZ6P/NISIqQkA///zzB+5K5xp3//5EVRDyAEww//0AsCoVEgXBMOf/8DAtQ7m64+OozOlAUM1P0v/+1LEBoALaT1eGaUAAXgSLNcyYAC2SPpUsc1LXfRsCASz2P4hx6Lc9GXmBfkw8tZflx4YPCT/9SRScqP//9z3MceEn//6GTDydj3///89DCdDEaSf/8uAy7xwQOHP////DwfG2+222CQV6iUNYM+TqlVa9L3KmZVTa5GYZOCgcBnJb5TIECUyRdGUAsnf8z+d6QiNhqOea/nvl3aEBIGp20OA+DmVER6R5cPggNBXo54ufOa8RW53YqBAwD5rWf9i1QBRaLbaKBQKBQKBQIAAvP/7UsQHgAt4+3G5KIARhpCr5zKAAOF5w04zdsCZgdImngZAFjjXgdINt3+JzHAj/k+Oz/8c8ZccYfILI//IgM2Rc3IoQT//KhukaEXL5v//+ThgaEXIuT5FC47/1h8EIYB8DDHXCHDFXSCAMxUtGtJYL8tdg6GaSNxn39XLL7eNKAkAsOLY4AYHQBXMRtgBQ6BsDaoRCprJFahn931X5Zg6JFTUMCwNQkDQlDSgHPVhI9YVLmog+IgqCoiCp3/yvhIGhKojJYYJvM2Jxl3yCpKZ//tSxAaAC6yNYBmUAAGHjyxnMmAAVA96GIpLs6/QA4fs3nuLtxyWeKGUHRIqp4oKJCV8qKlHO7iif7vcMUCoJ8PghErqYPvDAP2xY9PQfAhx3rOlQkeLSnn5MMWHz325c/L///LASggigsgAigAi4rqkXjEBathuNyidxXMplT/WPcl+QUJACBoBI/8hgSaAamZ0hnRNIq7y1IPZDDSOGkZUGkTgBCQKnpY9wRCQKivrflRgaFSxU7hI99rFf2f8tPCK8ioVBWqS7XXW7XW3a63/+1LEBIALQG+BuYQAEYQhbPco0ALXajUCgr/G1RRomUuyevt8+0CRuUSyXUMv8+A6OAXBuiJLKI4NBTRMV1qkSqe0kkVGEmg+9JcuFlHoIOSoE7zwig+BJQocvK53ykul8lV//+sk0CAUCAQCgQCAUCgQAKUkwpOhSVAxxcBIbwsiCyLwdIX3x3DtEt/CeifDmT/y8OIIsHJC8/+a5IkkPb/8vLROGJdLv/+ZF4+ZF4vIl0u///1o0iSMTpH/4LA0JRCCoieeI754xikDibBxIv/7UsQFAArcjVoZlIABj5OrpzCQAJGGQze4cq23dgqx6PUIWJMysI0RWbGfJ9AQqP1i92HhaKbKrs/y92sh5U0qVf9QCEwk+/CQGNBo97/UFSrAqP//giRPDQERad///7AqBVM1VNVVVVUCErXSV7vmADFm1xim35f19X57hATtkIppgEhCxEh/ggxo8QktYxekJUyiihghZ3+9kmohWlcaVz//anLJLPPBIJBx2E1gycUEnq7yskFHqq/uUDzUhN3//iFmPgL/7PPPLPPPACks//tSxAWAC+kfWzmDgAE7EKa3JQAA4Cjs1HhV5fYgp0b+43L3ta13oP0CwB2Y44VFQu5AaMeC0qJKex7k3HSIjINv6MZU4kKVI/2U8/RSI9Jf7oxmyuhw65tTSn/P+ZtY6hxUCrO//q16gAAKBAMBQMBgCAQAAAAIOC0GLYNg4Wa/DaABa8Mai2+A+CyUOl/E9CORcI1v8RyJ1HwKRFk/+TAxosknCAi5fxoaEp3+Cqzol/86u3/67UxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqr/+1LEDIPAAAGkHAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7UsRqg8AAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';

const prefixes = ['webkit', 'moz', 'ms', ''];
function prefixedEvent(element, type, callback) {
  for (let p = 0; p < prefixes.length; p++) {
    if (!prefixes[p]) type = type.toLowerCase();
    element.addEventListener(prefixes[p] + type, callback, false);
  }
}

function transform($e, xValue, yValue, scaleValue, rotationValue, percent) {
  const x = xValue || 0;
  const y = yValue || 0;
  const scale = scaleValue || 1;
  const unit = percent ? '%' : 'px';
  const rotation = rotationValue || 0;

  const transfromString = `translate(${
    x
  }${unit
  }, ${
    y
  }${unit
  }) `
    + `scale(${
      scale
    }) `
    + `rotate(${
      rotation
    }deg)`;

  $e.style.webkitTransform = transfromString;
  $e.style.MozTransform = transfromString;
  $e.style.transform = transfromString;
}

function createParticle(x, y, scale) {
  const $particle = document.createElement('i');
  const $sparcle = document.createElement('i');

  $particle.className = 'particle';
  $sparcle.className = 'sparcle';

  transform($particle, x, y, scale);
  $particle.appendChild($sparcle);

  return $particle;
}

function explode($container) {
  const particles = [];

  particles.push(createParticle(0, 0, 1));
  particles.push(createParticle(50, -15, 0.4));
  particles.push(createParticle(50, -105, 0.2));
  particles.push(createParticle(-10, -60, 0.8));
  particles.push(createParticle(-10, 60, 0.4));
  particles.push(createParticle(-50, -60, 0.2));
  particles.push(createParticle(-50, -15, 0.75));
  particles.push(createParticle(-100, -15, 0.4));
  particles.push(createParticle(-100, -15, 0.2));
  particles.push(createParticle(-100, -115, 0.2));
  particles.push(createParticle(80, -15, 0.1));

  particles.forEach((particle) => {
    $container.appendChild(particle);
    prefixedEvent(particle, 'AnimationEnd', () => {
      const self = this;
      setTimeout(() => {
        requestAnimationFrame(() => {
          $container.removeChild(self);
        });
      }, 100);
    });
  });
}

function exolpodeGroup(x, y, trans) {
  const $container = document.createElement('div');

  $container.className = 'container';
  $container.style.top = `${y}px`;
  $container.style.left = `${x}px`;

  transform($container, trans.x, trans.y, trans.scale, trans.r, true);

  explode($container);
  return $container;
}

export function sparcle(event) {
  const explosions = [];

  explosions.push(
    exolpodeGroup(event.pageX, event.pageY, { scale: 1, x: -50, y: -50, r: 0 }),
  );
  explosions.push(
    exolpodeGroup(event.pageX, event.pageY, {
      scale: 0.5,
      x: -30,
      y: -50,
      r: 180,
    }),
  );
  explosions.push(
    exolpodeGroup(event.pageX, event.pageY, {
      scale: 0.5,
      x: -50,
      y: -20,
      r: -90,
    }),
  );

  const audio = new Audio();
  audio.src = mp3explosion;

  requestAnimationFrame(() => {
    audio.play();
    explosions.forEach((boum, i) => {
      setTimeout(() => {
        document.body.appendChild(boum);
      }, i * 100);
    });
  });
}

