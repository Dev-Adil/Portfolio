declare module 'react-vertical-timeline-component' {
  import type { ComponentType, ReactNode } from 'react';

  export const VerticalTimeline: ComponentType<{
    animate?: boolean;
    className?: string;
    children?: ReactNode;
  }>;

  export const VerticalTimelineElement: ComponentType<any>;

  export default {};
}


