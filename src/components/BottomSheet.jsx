import React, { useRef, useState, useEffect } from "react";
import "./BottomSheet.css";

const SNAP_POINTS = [0.9, 0.5, 0.1]; // 90%, 50%, 10% of viewport height

function getClosestSnapPoint(value, snapPoints) {
  return snapPoints.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

export default function BottomSheet({ children, position, onPositionChange }) {
  const sheetRef = useRef(null);
  const [dragY, setDragY] = useState(null);
  const [animating, setAnimating] = useState(false);

  // Calculate translateY based on snap point
  const getTranslateY = (snapIndex) =>
    `${(1 - SNAP_POINTS[snapIndex]) * 100}vh`;

  // Spring animation logic
  const animateTo = (targetIndex) => {
    console.log('Animating to position:', targetIndex);
    setAnimating(true);
    const currentPercent = 1 - SNAP_POINTS[position];
    const targetPercent = 1 - SNAP_POINTS[targetIndex];
    let current = currentPercent * 100;
    const target = targetPercent * 100;
    let velocity = 0;
    const stiffness = 0.15;
    const damping = 0.8;

    function step() {
      const displacement = target - current;
      velocity += displacement * stiffness;
      velocity *= damping;
      current += velocity;

      sheetRef.current.style.transform = `translateY(${current}vh)`;

      if (Math.abs(displacement) > 0.5 || Math.abs(velocity) > 0.5) {
        requestAnimationFrame(step);
      } else {
        sheetRef.current.style.transform = `translateY(${target}vh)`;
        onPositionChange(targetIndex);
        setAnimating(false);
      }
    }
    step();
  };

  // Drag handlers
  const onDragStart = (e) => {
    console.log('Drag started');
    if (animating) return;
    setDragY(e.touches ? e.touches[0].clientY : e.clientY);
    document.body.style.userSelect = "none";
  };

  const onDragMove = (e) => {
    if (dragY === null) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = clientY - dragY;
    const currentPercent = 1 - SNAP_POINTS[position];
    const base = currentPercent * window.innerHeight;
    let next = base + delta;
    const minHeight = (1 - SNAP_POINTS[0]) * window.innerHeight;
    const maxHeight = (1 - SNAP_POINTS[2]) * window.innerHeight;
    next = Math.max(minHeight, Math.min(next, maxHeight));
    const percent = 1 - (next / window.innerHeight);
    sheetRef.current.style.transform = `translateY(${percent * 100}vh)`;
  };

  const onDragEnd = (e) => {
    console.log('Drag ended');
    if (dragY === null) return;
    const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const delta = clientY - dragY;
    const currentPercent = 1 - SNAP_POINTS[position];
    const base = currentPercent * window.innerHeight;
    let next = base + delta;
    const percent = 1 - (next / window.innerHeight);
    const closest = getClosestSnapPoint(percent, SNAP_POINTS);
    const targetIndex = SNAP_POINTS.indexOf(closest);
    setDragY(null);
    document.body.style.userSelect = "";
    animateTo(targetIndex);
  };

  // Button handlers
  const goTo = (idx) => {
    if (!animating) animateTo(idx);
  };

  // Keyboard handlers
  const handleKeyDown = (e) => {
    if (animating) return;
    
    const content = sheetRef.current?.querySelector('.content');
    const isAtTop = content?.scrollTop === 0;
    const isAtBottom = content?.scrollHeight - content?.scrollTop === content?.clientHeight;

    switch (e.key) {
      case "ArrowUp":
        if (position > 0 && isAtTop) {
          e.preventDefault();
          goTo(position - 1);
        }
        break;
      case "ArrowDown":
        if (position < 2 && isAtBottom) {
          e.preventDefault();
          goTo(position + 1);
        }
        break;
      case "Home":
        e.preventDefault();
        if (e.ctrlKey || e.metaKey) {
          // Ctrl/Cmd + Home: Scroll to top
          content?.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // Just Home: Open sheet fully
          goTo(0);
        }
        break;
      case "End":
        e.preventDefault();
        if (e.ctrlKey || e.metaKey) {
          // Ctrl/Cmd + End: Scroll to bottom
          content?.scrollTo({ top: content?.scrollHeight, behavior: 'smooth' });
        } else {
          // Just End: Close sheet
          goTo(2);
        }
        break;
      case "Escape":
        e.preventDefault();
        goTo(2);
        break;
      case "PageUp":
        e.preventDefault();
        if (position > 0 && isAtTop) {
          goTo(position - 1);
        } else {
          content?.scrollBy({ top: -content?.clientHeight, behavior: 'smooth' });
        }
        break;
      case "PageDown":
        e.preventDefault();
        if (position < 2 && isAtBottom) {
          goTo(position + 1);
        } else {
          content?.scrollBy({ top: content?.clientHeight, behavior: 'smooth' });
        }
        break;
      case "Space":
        e.preventDefault();
        if (position === 2) {
          goTo(0);
        } else {
          goTo(2);
        }
        break;
      default:
        break;
    }
  };

  // Set initial position and focus
  useEffect(() => {
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${getTranslateY(position)})`;
      // Focus the sheet when it's opened
      if (position < 2) {
        sheetRef.current.focus();
      }
    }
  }, [sheetRef, position]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      goTo(2); // Close the sheet
    }
  };

  return (
    <>
      {position < 2 && (
        <div 
          className="backdrop" 
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}
      <div
        className="bottom-sheet"
        ref={sheetRef}
        style={{ transform: `translateY(${getTranslateY(position)})` }}
        onMouseDown={onDragStart}
        onTouchStart={onDragStart}
        onMouseMove={onDragMove}
        onTouchMove={onDragMove}
        onMouseUp={onDragEnd}
        onTouchEnd={onDragEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="dialog"
        aria-label="Bottom Sheet"
        aria-modal="true"
        aria-hidden={position === 2}
      >
        <div className="sheet-header">
          <div className="handle" aria-hidden="true" />
          <button 
            className="close-button"
            onClick={() => goTo(2)}
            aria-label="Close sheet"
          >
            ×
          </button>
        </div>
        <div 
          className="content" 
          tabIndex={0}
          role="region"
          aria-label="Sheet content"
        >
          {children}
        </div>
      </div>
    </>
  );
} 