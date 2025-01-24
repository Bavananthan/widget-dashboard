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
  const [width, setWidth] = useState(1200);
  const containerRef = React.useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [state.isSidebarOpen]);

  const onLayoutChange = (layout) => {
    dispatch({ type: 'UPDATE_LAYOUTS', payload: layout });
  };

  return (
    <div
      ref={containerRef}
      className={`flex-1 p-4 overflow-auto ${
        state.isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
      {state.widgets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome to your Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Get started by adding widgets from the sidebar
          </p>
        </div>
      ) : (
        <GridLayout
          className="layout"
          layout={state.layouts}
          cols={12}
          rowHeight={30}
          width={width - 32} // Subtract padding
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
            const layout = state.layouts.find(l => l.i === widget.id) || {
              w: 4,
              h: 6,
              x: 0,
              y: 0,
              minW: 3,
              minH: 4
            };
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