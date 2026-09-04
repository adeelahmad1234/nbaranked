import { motion } from 'framer-motion';
import { Button } from '../shared/Button.jsx';

export function LandingScreen({ onStart }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="mx-auto flex min-h-[calc(100vh-64px)] max-w-2xl flex-col items-center justify-center gap-8 px-4 py-16 text-center"
    >
      <p className="max-w-md text-lg text-navy sm:text-xl">
        Cut 5 of 30 current NBA players, then settle every remaining matchup
        head to head to build your definitive top 25.
      </p>
      <Button onClick={onStart} className="text-base">
        Start Ranking
      </Button>
    </motion.section>
  );
}
