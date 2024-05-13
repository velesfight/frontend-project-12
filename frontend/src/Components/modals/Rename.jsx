
import React, { useEffect} from 'react';
import { useContext } from 'react';
import { hideModal, modalsSlice, showModal } from '../slices/uiSlisec';

const Rename = () => {
const dispatch = useDispatch();
const { renameChannel } = useContext();
const channels = useSelector(channelSelectors.selectAll);

}