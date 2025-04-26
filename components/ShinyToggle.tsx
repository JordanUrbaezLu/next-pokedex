'use client';

import { useShiny } from '@/contexts/ShinyContext';
import Switch from '@mui/material/Switch';

/**
 * @description
 * The toggle that sets the pokemon sprites to shiny
 */

const ShinyToggle = () => {
  const { toggleShiny } = useShiny();
  return <Switch color="secondary" onChange={toggleShiny} />;
};

export default ShinyToggle;
