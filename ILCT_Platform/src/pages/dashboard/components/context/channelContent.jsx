import React, { createContext, useState, useContext } from 'react';

const ChannelContext = createContext();

export const useChannel = () => {
    return useContext(ChannelContext);
};

export const ChannelProvider = ({ children }) => {
    const [selectedChannel, setSelectedChannel] = useState(null);

    return (
        <ChannelContext.Provider value={{ selectedChannel, setSelectedChannel }}>
            {children}
        </ChannelContext.Provider>
    );
};
