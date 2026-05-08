import { FC } from 'react';

import { homeHeroParticles } from '@/constants/home/home.constants';

const CustomParticles: FC = () => {
  return (
    <div className="absolute inset-0">
      {homeHeroParticles.map((p, i) => (
        <div
          key={i}
          className="floating-particle absolute w-1 h-1 bg-primary/80 rounded"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
        />
      ))}
    </div>
  );
};

export default CustomParticles;
