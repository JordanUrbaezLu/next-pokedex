import Modal from '@mui/material/Modal';
import { PokemonData } from '@/types/PokemonData';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

/**
 * @description
 * The Display Card that shows when a pokemon card is clicked
 */

const DisplayCardModal = ({
  isDisplayCardOpen,
  handleClose,
  displayedPokemon,
}: {
  isDisplayCardOpen: boolean;
  handleClose: () => void;
  displayedPokemon: PokemonData | null;
}) => {
  const maxStat = 255;

  const statBarColor = (value: number) => {
    if (value >= 150) return 'bg-purple-500';
    if (value >= 125) return 'bg-sky-500';
    if (value >= 100) return 'bg-green-500';
    if (value >= 75) return 'bg-yellow-500';
    if (value >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <Modal
      open={isDisplayCardOpen}
      onClose={handleClose}
      disableScrollLock
    >
      <div className="relative w-[360px] h-auto bg-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-md border-4 border-black text-white shadow-lg">
        <div className="absolute top-2 right-2">
          <img
            src="/pokedex.png"
            alt="pokedex"
            className="w-10 h-10"
          />
        </div>
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          className="absolute bottom-2 right-2 text-white hover:text-black"
        >
          <CloseIcon />
        </IconButton>

        <div className="text-lg font-bold mb-4 text-black">
          Pokemon Display Card
        </div>

        {displayedPokemon?.img && (
          <div className="flex justify-center mb-4">
            <img
              src={displayedPokemon.img}
              alt={displayedPokemon.name}
              className="w-20 h-20"
            />
          </div>
        )}

        <div className="text-xl font-bold mb-4 text-black">
          {displayedPokemon?.name}
        </div>

        {/* Stat Bars */}
        {Object.entries(displayedPokemon?.stats || {}).map(
          ([key, value]) => {
            const fillPercent =
              typeof value === 'number' ? (value / maxStat) * 100 : 0;

            return (
              <div key={key} className="mb-3 text-black">
                <div className="flex justify-between text-m font-bold capitalize">
                  <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span>{value}</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${statBarColor(value)}`}
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
    </Modal>
  );
};

export default DisplayCardModal;
