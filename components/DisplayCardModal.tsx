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
  return (
    <Modal open={isDisplayCardOpen} onClose={handleClose}>
      <div className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3">
        <div className="flex">
          <div>Pokemon Display Card</div>
          <IconButton
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className="font-bold">{displayedPokemon?.name}</div>
        <div>HP: {displayedPokemon?.stats?.hp}</div>
        <div>Attack: {displayedPokemon?.stats?.attack}</div>
        <div>Defense: {displayedPokemon?.stats?.defense}</div>
        <div>
          Special Attack: {displayedPokemon?.stats?.specialAttack}
        </div>
        <div>
          Special Defense: {displayedPokemon?.stats?.specialDefense}
        </div>
        <div>Speed: {displayedPokemon?.stats?.speed}</div>
      </div>
    </Modal>
  );
};

export default DisplayCardModal;
