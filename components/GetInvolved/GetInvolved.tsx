import React from 'react';
import MobileGetInvolved from './MobileGetInvolved';
import DesktopGetInvolved from './DesktopGetInvolved';

export default function GetInvolved() {
  return (
    <div>
      <DesktopGetInvolved />
      <MobileGetInvolved />
    </div>
  );
}
