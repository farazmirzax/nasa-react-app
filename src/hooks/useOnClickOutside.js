import { useEffect } from 'react';

/**
 * A custom hook that triggers a handler function when a click is detected outside of a referenced element.
 * @param {React.RefObject} ref - The ref of the element to monitor.
 * @param {Function} handler - The function to call when an outside click is detected.
 */
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };

      // Add event listeners for both mouse and touch events
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      // Cleanup function to remove event listeners
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to the dependency array
    // This ensures the effect is re-run if they change
    [ref, handler]
  );
}

export default useOnClickOutside;
