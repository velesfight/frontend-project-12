import Add from './Add';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const getModal = (modalType) => modals[modalType];

export default getModal;