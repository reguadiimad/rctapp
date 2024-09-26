import React, { useState } from 'react';

function BluredInterface({children, w, h, extraStyle=''}) {

    const shapeStyle = `mask relative z-10  select-none rounded-3xl bg-[#848edb]/5  backdrop-blur-xl after:absolute after:inset-0 after:rounded-3xl after:bg-gradient-to-br after:from-white/80 after:via-white/10 after:to-white/80 after:p-px w-${w} h-${h}`

    return (
        <div className={shapeStyle+' '+extraStyle} >
            {children}
        </div>
    );
}

export default BluredInterface;
