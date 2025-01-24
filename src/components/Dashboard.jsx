import React, { useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useDashboard } from '../context/DashboardContext';
import ChartWidget from './widgets/ChartWidget';
import TextWidget from './widgets/TextWidget';
import TodoWidget from './widgets/TodoWidget';
import ImageWidget from './widgets/ImageWidget';

const widgetComponents = {
  chart: ChartWidget,
  text: TextWidget,
  todo: TodoWidget,
  image: ImageWidget,
};

export default function Dashboard() {
  const { state, dispatch } = useDashboard();
  const [cols, setCols] = useState(12); // Default number of columns
  const [rowHeight, setRowHeight] = useState(30); // Default row height
  const containerRef = React.useRef(null);

  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;

        // Adjust number of columns based on container width
        if (width >= 1200) {
          setCols(12); // Large screen (desktop)
          setRowHeight(30); // Default row height for large screen
        } else if (width >= 900) {
          setCols(9); // Medium screen (tablet/large tablet)
          setRowHeight(25); // Adjust row height for medium screen
        } else if (width >= 600) {
          setCols(6); // Smaller screen (portrait tablet)
          setRowHeight(20); // Adjust row height for smaller screen
        } else {
          setCols(4); // Smallest screen (mobile)
          setRowHeight(15); // Adjust row height for mobile
        }
      }
    };

    // Run on mount and when screen resizes
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const onLayoutChange = (layout) => {
    dispatch({ type: 'UPDATE_LAYOUTS', payload: layout });
  };

  return (
    <div
      ref={containerRef}
      className={`flex-1 p-4 overflow-auto ${state.isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}
    >
      {state.widgets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome to your Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Get started by adding widgets from the sidebar</p>
        </div>
      ) : (
        <GridLayout
          className="layout"
          layout={state.layouts}
          cols={cols} // Use dynamic column count
          rowHeight={rowHeight} // Use dynamic row height
          width={containerRef.current ? containerRef.current.offsetWidth - 32 : 1200} // Subtract padding
          onLayoutChange={onLayoutChange}
          isDraggable={true}
          isResizable={true}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          compactType="vertical"
          preventCollision={false}
        >
          {state.widgets.map((widget) => {
            const Widget = widgetComponents[widget.type];

            // Determine the widget size based on screen size, but allow resizing
            const layout = state.layouts.find((l) => l.i === widget.id) || {
              w: 4, // Default width for small screens
              h: 6, // Default height for small screens
              x: 0,
              y: 0,
              minW: 3,
              minH: 4,
            };

            // Dynamically adjust the widget size based on screen width
            if (cols === 12) {
              layout.w = Math.max(4, layout.w); // Ensure a minimum width for larger screens
              layout.h = Math.max(4, layout.h); // Ensure a minimum height
            } else if (cols === 9) {
              layout.w = Math.max(3, layout.w); // Medium screens
              layout.h = Math.max(4, layout.h);
            } else if (cols === 6) {
              layout.w = Math.max(2, layout.w); // Smaller screens
              layout.h = Math.max(3, layout.h);
            } else {
              layout.w = Math.max(2, layout.w); // Mobile
              layout.h = Math.max(2, layout.h);
            }

            return (
              <div key={widget.id} data-grid={layout} className="widget-container">
                <Widget widget={widget} />
              </div>
            );
          })}
        </GridLayout>
      )}
    </div>
  );
}
