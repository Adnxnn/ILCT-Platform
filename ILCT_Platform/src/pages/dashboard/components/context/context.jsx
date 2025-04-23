import React, { createContext, useContext, useState } from 'react';

const ChannelOptionsContext = createContext();

export const useChannelOptions = () => useContext(ChannelOptionsContext);

export const ChannelOptionsProvider = ({ children }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const resetOptions = () => {
        setSelectedOption(null)
    };

    return (
        <ChannelOptionsContext.Provider value={{ selectedOption, setSelectedOption, resetOptions }}>
            {children}
        </ChannelOptionsContext.Provider>
    );
};
