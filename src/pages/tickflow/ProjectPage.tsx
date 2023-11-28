import { useEffect, useRef } from 'react';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';
import { ProjectList } from '@components/tickflow';

export function ProjectPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { screenSize } = useScreenSize();

  useEffect(() => {
    if (screenSize <= ScreenSize.MD) {
      mainRef.current?.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [screenSize]);

  return (
    <div className='sm:px-8 lg:px-0'>
      <div
        className={screenSize <= ScreenSize.MD ? 'overflow-y-scroll h-screen px-2' : ''}
        ref={mainRef}
      >
        <ProjectList />
      </div>
    </div>
  );
}
