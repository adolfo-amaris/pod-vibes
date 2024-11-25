import React from 'react';
import './../styles/filter.scss';


interface FilterProps {
    filter: string;
    setFilter: (value: string) => void;
    placeholder?: string;
    count: number;
}

const Filter: React.FC<FilterProps> = ({ filter, setFilter, placeholder = "Filter...", count }) => {
    return (
        <div className="boxsearch flex flex-center justify-end">
            <div className="filter-count flex flex-center">
                <span>{count}</span>
            </div>
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder={placeholder}
                className="filter-input boxsearch__input align-self-end boxstyles"
            />
        </div>
    );
};

export default Filter;
