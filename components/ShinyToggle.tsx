'use client';

import { useShiny } from '@/contexts/ShinyProvider';
import Switch from '@mui/material/Switch';

const ShinyToggle = () => {
  const { toggleShiny } = useShiny();
  return <Switch color="secondary" onChange={toggleShiny} />;
};

export default ShinyToggle;
