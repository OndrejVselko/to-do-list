import React, { createContext, useContext, useState } from 'react';

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <SelectionContext.Provider value={{ selectedItem, setSelectedItem }}>
            {children}
        </SelectionContext.Provider>
    );
};

export const useSelection = () => useContext(SelectionContext);
