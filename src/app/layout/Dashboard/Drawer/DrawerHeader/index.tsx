import PropTypes from 'prop-types';

// project imports
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from '../../../../shared/common/logo';

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }: any) {
  return (
    <DrawerHeaderStyled
      sx={{
        minHeight: '90px',
        width: 'initial',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: open ? '65px' : 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: open ? 'flex-start' : 'center', // 👈 centered when closed
      }}
    >
      <Logo
        isIcon={!open}
        sx={{
          width: open ? 'auto' : 35,
          height: 35,
        }}
      />
    </DrawerHeaderStyled>
  );
}

DrawerHeader.propTypes = {
  open: PropTypes.bool,
};
