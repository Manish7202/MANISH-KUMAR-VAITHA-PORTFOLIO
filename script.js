window.addEventListener('load', function () {
 
 
  try {
 
    
    const avatarCanvas = document.getElementById('avatarCanvas');
    const AW = 260, AH = 420;
    avatarCanvas.width  = AW;
    avatarCanvas.height = AH;
 
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(42, AW / AH, 0.1, 100);
    camera.position.set(0, 0.1, 5.8);
    camera.lookAt(0, 0, 0);
 
    const renderer = new THREE.WebGLRenderer({ canvas: avatarCanvas, alpha: true, antialias: true });
    renderer.setSize(AW, AH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
 
    // ── LIGHTING ───────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
 
    const key = new THREE.DirectionalLight(0xfff5e0, 1.3);
    key.position.set(3, 5, 4);
    scene.add(key);
 
    const fill = new THREE.PointLight(0x1af0dc, 1.2, 25);
    fill.position.set(-4, 1, 3);
    scene.add(fill);
 
    const rim = new THREE.DirectionalLight(0x0057ff, 0.7);
    rim.position.set(-2, 4, -4);
    scene.add(rim);
 
    const ground = new THREE.PointLight(0x1af0dc, 0.35, 12);
    ground.position.set(0, -4, 2);
    scene.add(ground);
 
   
    const M = {
      skin:     new THREE.MeshStandardMaterial({ color: 0xb8794e, roughness: 0.65, metalness: 0.0 }),
      skinD:    new THREE.MeshStandardMaterial({ color: 0x9e6337, roughness: 0.75, metalness: 0.0 }),
      hair:     new THREE.MeshStandardMaterial({ color: 0x0c0c0c, roughness: 0.6,  metalness: 0.1 }),
      beard:    new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.85, metalness: 0.0 }),
      // Teal shirt — matches photo exactly
      shirt:    new THREE.MeshStandardMaterial({ color: 0x0d7fa8, roughness: 0.45, metalness: 0.08, emissive: 0x042535, emissiveIntensity: 0.2 }),
      shirtD:   new THREE.MeshStandardMaterial({ color: 0x095f7c, roughness: 0.5,  metalness: 0.1 }),
      // Beige cargo pants
      pants:    new THREE.MeshStandardMaterial({ color: 0xc2aa80, roughness: 0.78, metalness: 0.0 }),
      pantsD:   new THREE.MeshStandardMaterial({ color: 0xad9668, roughness: 0.8,  metalness: 0.0 }),
      shoes:    new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.55, metalness: 0.25 }),
      sole:     new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.5,  metalness: 0.0 }),
      eyeW:     new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.3 }),
      eyeI:     new THREE.MeshStandardMaterial({ color: 0x2d1c0e, roughness: 0.4 }),
      // Glowing cyan eye rings (tech effect)
      eyeGlow:  new THREE.MeshStandardMaterial({ color: 0x1af0dc, emissive: 0x1af0dc, emissiveIntensity: 1.0, roughness: 0.1 }),
      // Yellow bracelet — spotted in photo!
      bracelet: new THREE.MeshStandardMaterial({ color: 0xf5c518, emissive: 0xf0a000, emissiveIntensity: 0.5, roughness: 0.25, metalness: 0.75 }),
      belt:     new THREE.MeshStandardMaterial({ color: 0x1a0f05, roughness: 0.5,  metalness: 0.3 }),
      buckle:   new THREE.MeshStandardMaterial({ color: 0xb8860b, metalness: 0.85, roughness: 0.15 }),
    };
 
    
    const av = new THREE.Group();
    scene.add(av);
 
    function mesh(geo, mat, px=0,py=0,pz=0, rx=0,ry=0,rz=0, sx=1,sy=1,sz=1) {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(px, py, pz);
      m.rotation.set(rx, ry, rz);
      m.scale.set(sx, sy, sz);
      return m;
    }
 
   
    const hg = new THREE.Group();
    hg.position.set(0, 1.45, 0);
    av.add(hg);
 
    hg.add(mesh(new THREE.SphereGeometry(0.43, 32, 32), M.skin));
    hg.add(mesh(new THREE.SphereGeometry(0.4, 24, 16, 0, Math.PI*2, Math.PI*0.48, Math.PI*0.52), M.skinD, 0,-0.08,0, 0,0,0, 1.05,0.8,0.9));
 
    // Hair — dark, styled like in photo
    hg.add(mesh(new THREE.SphereGeometry(0.455, 32, 16, 0, Math.PI*2, 0, Math.PI*0.44), M.hair, 0,0.14,0));
    hg.add(mesh(new THREE.SphereGeometry(0.3, 18, 14, 0, Math.PI*2, 0, Math.PI*0.62), M.hair, -0.37,0.02,0, 0,0,0, 0.52,0.88,0.58));
    hg.add(mesh(new THREE.SphereGeometry(0.3, 18, 14, 0, Math.PI*2, 0, Math.PI*0.62), M.hair,  0.37,0.02,0, 0,0,0, 0.52,0.88,0.58));
    hg.add(mesh(new THREE.BoxGeometry(0.55, 0.13, 0.26), M.hair, 0.08,0.38,0.22, 0.18,0,-0.12));
 
   
    hg.add(mesh(new THREE.SphereGeometry(0.31, 20, 16, 0, Math.PI*2, Math.PI*0.6, Math.PI*0.42), M.beard, 0,-0.22,0.06, 0,0,0, 1.05,0.9,0.88));
    hg.add(mesh(new THREE.SphereGeometry(0.14, 14, 14), M.beard, 0,-0.38,0.18, 0,0,0, 1,0.7,0.8));
    hg.add(mesh(new THREE.BoxGeometry(0.24, 0.07, 0.08), M.beard, 0,-0.05,0.4));
    hg.add(mesh(new THREE.SphereGeometry(0.13, 12, 12), M.beard, -0.22,-0.18,0.28, 0,0,0, 1,0.6,0.5));
    hg.add(mesh(new THREE.SphereGeometry(0.13, 12, 12), M.beard,  0.22,-0.18,0.28, 0,0,0, 1,0.6,0.5));
 
    
    [-0.155, 0.155].forEach(x => {
      hg.add(mesh(new THREE.SphereGeometry(0.088, 16, 16), M.eyeW, x,0.1,0.36, 0,0,0, 1,0.82,0.72));
      hg.add(mesh(new THREE.SphereGeometry(0.052, 16, 16), M.eyeI, x,0.1,0.43));
      hg.add(mesh(new THREE.TorusGeometry(0.062, 0.013, 8, 22), M.eyeGlow, x,0.1,0.42));
    });
 
    
    [-0.155, 0.155].forEach(x => {
      hg.add(mesh(new THREE.BoxGeometry(0.15, 0.033, 0.04), M.hair, x,0.22,0.4, 0,0, x<0?0.1:-0.1));
    });
 
    
    hg.add(mesh(new THREE.SphereGeometry(0.07, 12, 12), M.skinD, 0,-0.01,0.44, 0,0,0, 0.75,0.62,0.68));
    [-1, 1].forEach(s => hg.add(mesh(new THREE.SphereGeometry(0.1, 14, 12), M.skin, s*0.44,0.01,0, 0,0,0, 0.45,0.75,0.55)));
 
    
    av.add(mesh(new THREE.CylinderGeometry(0.155, 0.185, 0.24, 16), M.skin, 0,1.1,0));
 
   
    av.add(mesh(new THREE.CylinderGeometry(0.44, 0.41, 0.88, 22), M.shirt, 0,0.55,0));
    av.add(mesh(new THREE.CylinderGeometry(0.18, 0.23, 0.14, 16, 1, true), M.shirt, 0,0.98,0));
 
    
    for (let i = 0; i < 4; i++) av.add(mesh(new THREE.SphereGeometry(0.024, 8, 8), M.shirtD, 0, 0.84-i*0.17, 0.44));
    av.add(mesh(new THREE.BoxGeometry(0.15, 0.11, 0.03), M.shirtD, 0.21,0.72,0.44));
    av.add(mesh(new THREE.BoxGeometry(0.04, 0.24, 0.03), M.shirtD, -0.06,0.88,0.44, 0,0,0.15));
    av.add(mesh(new THREE.BoxGeometry(0.04, 0.24, 0.03), M.shirtD,  0.06,0.88,0.44, 0,0,-0.15));
 
    
    const ag = new THREE.Group();
    ag.position.set(0, 0.56, 0);
    av.add(ag);
 
    
    ag.add(mesh(new THREE.CylinderGeometry(0.115, 0.105, 0.52, 14), M.shirt, -0.46,0.06,0.08, 0.28,0,-1.18));
    // Left forearm crossing right
    ag.add(mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.54, 14), M.shirt, 0.06,-0.15,0.26, 0.38,0, Math.PI/2-0.08));
    // Right upper arm
    ag.add(mesh(new THREE.CylinderGeometry(0.115, 0.105, 0.52, 14), M.shirt,  0.46,0.06,0.08, 0.28,0, 1.18));
    // Right forearm crossing left (on top)
    ag.add(mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.54, 14), M.shirt, -0.06,-0.05,0.34, 0.28,0, -(Math.PI/2-0.08)));
    // Hands
    ag.add(mesh(new THREE.SphereGeometry(0.11, 14, 14), M.skin,  0.40,-0.15,0.3,  0,0,0, 1,0.85,0.78));
    ag.add(mesh(new THREE.SphereGeometry(0.11, 14, 14), M.skin, -0.40,-0.05,0.36, 0,0,0, 1,0.85,0.78));
    // Shoulder spheres
    [-0.52, 0.52].forEach(x => ag.add(mesh(new THREE.SphereGeometry(0.16, 16, 16), M.shirt, x,0.08,0)));
 
    
    ag.add(mesh(new THREE.TorusGeometry(0.098, 0.024, 10, 26), M.bracelet, 0.32,-0.12,0.28, 0.38,0, Math.PI/2));
 
    
    av.add(mesh(new THREE.CylinderGeometry(0.42, 0.4, 0.28, 22), M.shirt, 0,0.02,0));
    av.add(mesh(new THREE.CylinderGeometry(0.425, 0.425, 0.055, 26), M.belt, 0,-0.1,0));
    av.add(mesh(new THREE.BoxGeometry(0.1, 0.065, 0.04), M.buckle, 0,-0.1,0.44));
 
    
    [-0.2, 0.2].forEach(x => {
      av.add(mesh(new THREE.CylinderGeometry(0.165, 0.148, 0.62, 16), M.pants, x,-0.45,0));
      // Cargo pocket
      av.add(mesh(new THREE.BoxGeometry(0.13, 0.15, 0.04), M.pantsD, x<0?x-0.15:x+0.15,-0.5,0.01));
      av.add(mesh(new THREE.BoxGeometry(0.13, 0.01, 0.045), M.pants, x<0?x-0.15:x+0.15,-0.43,0.02));
      av.add(mesh(new THREE.CylinderGeometry(0.138, 0.12, 0.6, 16), M.pants, x,-0.96,0));
      // Shoes with white sole stripe
      av.add(mesh(new THREE.BoxGeometry(0.23, 0.145, 0.37), M.shoes, x,-1.29,0.06));
      av.add(mesh(new THREE.BoxGeometry(0.235, 0.03, 0.38), M.sole,  x,-1.37,0.06));
      av.add(mesh(new THREE.BoxGeometry(0.235, 0.04, 0.38), M.shoes, x,-1.41,0.06));
    });
 
    
    const parts = [];
    for (let i = 0; i < 16; i++) {
      const isBlue = i % 2 === 0;
      const pMat = new THREE.MeshStandardMaterial({
        color:   isBlue ? 0x0057ff : 0x1af0dc,
        emissive: isBlue ? 0x0057ff : 0x1af0dc,
        emissiveIntensity: 0.9
      });
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.022 + Math.random() * 0.028, 8, 8), pMat);
      const angle = (i / 16) * Math.PI * 2;
      const r  = 0.82 + Math.random() * 0.5;
      const yy = (Math.random() - 0.5) * 2.8;
      p.position.set(Math.cos(angle)*r, yy, Math.sin(angle)*r*0.42);
      av.add(p);
      parts.push({ mesh: p, angle, r, yBase: yy, spd: 0.004 + Math.random()*0.005, phase: Math.random()*Math.PI*2 });
    }
 
    // Ground glow disc
    const gDisc = new THREE.Mesh(
      new THREE.CircleGeometry(0.72, 32),
      new THREE.MeshBasicMaterial({ color: 0x1af0dc, transparent: true, opacity: 0.1, side: THREE.DoubleSide })
    );
    gDisc.rotation.x = -Math.PI / 2;
    gDisc.position.y = -1.47;
    av.add(gDisc);
 
    av.position.y = 0.1;
 
    
    let tRX = 0, tRY = 0, cRX = 0, cRY = 0;
 
    window.addEventListener('mousemove', e => {
      // Normalize mouse to -0.5 → 0.5 range
      tRY = (e.clientX / window.innerWidth  - 0.5) *  0.75;
      tRX = (e.clientY / window.innerHeight - 0.5) * -0.32;
    });
 
    
    let t = 0;
    (function loop() {
      requestAnimationFrame(loop);
      t += 0.016;
 
      
      cRX += (tRX - cRX) * 0.055;
      cRY += (tRY - cRY) * 0.055;
      av.rotation.x = cRX;
      av.rotation.y = cRY;
 
      
      av.position.y = 0.1 + Math.sin(t * 0.85) * 0.075;
 
      
      M.eyeGlow.emissiveIntensity  = 0.5 + Math.sin(t * 2.4) * 0.45;
      M.bracelet.emissiveIntensity = 0.3 + Math.sin(t * 1.7) * 0.28;
      fill.intensity               = 0.8 + Math.sin(t * 1.0) * 0.35;
 
      
      parts.forEach(p => {
        p.angle += p.spd;
        p.mesh.position.x = Math.cos(p.angle) * p.r;
        p.mesh.position.z = Math.sin(p.angle) * p.r * 0.42;
        p.mesh.position.y = p.yBase + Math.sin(t + p.phase) * 0.2;
      });
 
      
      gDisc.material.opacity = 0.07 + Math.sin(t * 0.9) * 0.06;
 
      renderer.render(scene, camera);
    })();
 
  } catch (e) {
    console.error('3D Avatar error:', e);
  }
 
 
 
 
  const rCanvas = document.getElementById('rippleCanvas');
  const rCtx    = rCanvas.getContext('2d');
  let RW, RH;
  const ripples = [];
 
 
  function resizeCanvas() {
    RW = rCanvas.width  = window.innerWidth;
    RH = rCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
 
  // Each ripple is an object that expands and fades out
  class Ripple {
    constructor(x, y) {
      this.x     = x;
      this.y     = y;
      this.r     = 0;
      this.maxR  = 110 + Math.random() * 70;
      this.alpha = 0.55;
      this.speed = 2.5 + Math.random() * 1.5;
      this.col   = Math.random() > 0.5 ? '26,240,220' : '0,87,255'; // cyan or blue
    }
    update() {
      this.r    += this.speed;
      this.alpha = 0.55 * (1 - this.r / this.maxR); // fade as it expands
    }
    draw() {
      rCtx.beginPath();
      rCtx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      rCtx.strokeStyle = `rgba(${this.col}, ${this.alpha})`;
      rCtx.lineWidth   = 1.5;
      rCtx.stroke();
    }
    dead() { return this.r >= this.maxR; }
  }
 
  
  let lastR = 0;
  window.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastR > 60) {
      ripples.push(new Ripple(e.clientX, e.clientY));
      lastR = now;
    }
  });
 
  
  window.addEventListener('click', e => {
    for (let i = 0; i < 4; i++) ripples.push(new Ripple(e.clientX, e.clientY));
  });
 
  
  (function animRipples() {
    rCtx.clearRect(0, 0, RW, RH);
 
    // Subtle background grid
    rCtx.strokeStyle = 'rgba(26,240,220,0.022)';
    rCtx.lineWidth   = 0.5;
    for (let x = 0; x <= RW; x += 60) {
      rCtx.beginPath(); rCtx.moveTo(x, 0); rCtx.lineTo(x, RH); rCtx.stroke();
    }
    for (let y = 0; y <= RH; y += 60) {
      rCtx.beginPath(); rCtx.moveTo(0, y); rCtx.lineTo(RW, y); rCtx.stroke();
    }
 
    // Draw & update all ripples, remove dead ones
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].update();
      ripples[i].draw();
      if (ripples[i].dead()) ripples.splice(i, 1);
    }
 
    requestAnimationFrame(animRipples);
  })();
 
 
  
 
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let cx = 0, cy = 0; // current mouse position
  let rx = 0, ry = 0; // ring position (lags behind)
 
  
  window.addEventListener('mousemove', e => {
    cx = e.clientX;
    cy = e.clientY;
    cur.style.left = cx + 'px';
    cur.style.top  = cy + 'px';
  });
 
  // Ring smoothly lerps toward mouse (12% closer each frame)
  (function animCursor() {
    rx += (cx - rx) * 0.12;
    ry += (cy - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animCursor);
  })();
 
  // Expand ring on hover over interactive elements
  document.querySelectorAll('a, button, .skill-pill, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width       = '56px';
      ring.style.height      = '56px';
      ring.style.borderColor = 'rgba(26,240,220,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width       = '36px';
      ring.style.height      = '36px';
      ring.style.borderColor = 'rgba(26,240,220,0.5)';
    });
  });
 
 
 
 
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
       
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
      }
    });
  }, { threshold: 0.1 });
 
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
 
}); 
 