import React, {useState, useRef} from 'react';
import MyInput from "./ui/input/MyInput";
import MySelect from "./ui/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    const [options, setOptions] = useState([
        {value: 'title', name: 'По названию поста'},
        {value: 'body', name: 'По описанию'}
    ]);

    return (
        <div>
            <MyInput
                placeholder="Поиск"
                value={filter.queryTitle}
                onChange={e => setFilter({...filter, queryTitle: e.target.value})}
            />
            <MySelect
                options={options}
                defaultValue="Сортировка по:"
                value={filter.sortColumn}
                onChange={selectedSort => setFilter({...filter, sortColumn: selectedSort})}
            />
        </div>
    );
}

export default PostFilter;