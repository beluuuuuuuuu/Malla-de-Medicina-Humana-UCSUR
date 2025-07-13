// Carga el estado guardado cuando la página abre
document.addEventListener('DOMContentLoaded', () => {
  const savedStates = JSON.parse(localStorage.getItem('courseStates')) || {};
  Object.keys(savedStates).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.className = savedStates[id];
      if (el.classList.contains('completed')) {
        el.onclick = null;
      } else if (el.classList.contains('active')) {
        el.style.pointerEvents = 'auto';
      }
    }
  });
});

// Marca curso como completado y guarda
function completeAndActivate(currentId, nextIds) {
  const currentCourse = document.getElementById(currentId);
  currentCourse.classList.remove('active');
  currentCourse.classList.add('completed');
  currentCourse.onclick = null;

  nextIds.forEach(id => {
    const next = document.getElementById(id);
    if (next && next.classList.contains('inactive')) {
      next.classList.remove('inactive');
      next.classList.add('active');
      next.style.pointerEvents = 'auto';
    }
  });

  saveStates();
  checkAndActivateFinal();
}

// Guarda el estado de TODOS los cursos
function saveStates() {
  const courses = document.querySelectorAll('.course');
  const states = {};
  courses.forEach(course => {
    states[course.id] = course.className;
  });
  localStorage.setItem('courseStates', JSON.stringify(states));
}

function checkAndActivateFinal() {
  const allRequired = [
    // tu lista de IDs de cursos base
  ];

  const allCompleted = allRequired.every(id => {
    const el = document.getElementById(id);
    return el && el.classList.contains('completed');
  });

  if (allCompleted) {
    ['preinternado','trabajo','internadoPediatria','internadoMedicina',
     'internadoCirugia','internadoGineco'].forEach(id => {
      const final = document.getElementById(id);
      final.classList.remove('inactive');
      final.classList.add('active');
      final.style.pointerEvents = 'auto';
    });
    saveStates();
  }
}
