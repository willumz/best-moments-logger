import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tag } from "../data_models";
import Search, { ItemIdTitle, SearchItemCollection } from "./Search";
import TagBox from "./TagBox";

interface Props {
    id: number;
    apiResource: string;
    innerElements?: JSX.Element[];
    className?: string;
}

const TagBar = (props: Props) => {

    const [tags, setTags] = React.useState<Tag[]>([]);
    const [searchItems, setSearchItems] = useState<SearchItemCollection<Tag>>(new SearchItemCollection<Tag>());

    useEffect(() => {
        axios.get(`/api/${props.apiResource}/${props.id}/tag`).then(res => {
            setTags(res.data);
        });
        axios.get(`/api/${props.apiResource}/${props.id}/tag`).then(res => {
            setTags(res.data);
        });

        getAllTags();
    }, [props.id, props.apiResource]);
  
  const getAllTags = () => {
    axios.get("/api/tag").then(res => {
      let newSearchItems = new SearchItemCollection<Tag>();
      res.data.forEach((tag: Tag) => {
        newSearchItems.newItem(tag.name, tag);
      });
      setSearchItems(newSearchItems);
    });
  };
  
  const selectItem = (item: ItemIdTitle) => {
    if (item.id === "-1") {
      // create new tag
      axios.post("/api/tag", {
        name: item.title,
      }).then(res => {
        getAllTags();
        // add tag
        axios.post(`/api/${props.apiResource}/${props.id}/tag`, { tag_id: res.data.id }).then(resLog => {
          setTags([...tags, res.data]);
        });
      });
    } else {
      // add existing tag
      let tag = searchItems.getById(item.id)?.data;
      if (tag !== undefined) {
        // add tag
        axios.post(`/api/${props.apiResource}/${props.id}/tag`, { tag_id: tag.id }).then(res => {
          if (tag !== undefined) setTags([...tags, tag]);
        });
      }
    }
  };

  const removeTag = (tag: Tag) => {
    axios.delete(`/api/${props.apiResource}/${props.id}/tag/${tag.id}`).then(res => {
        setTags(tags.filter(t => t.id !== tag.id));
    });
  };

  return (
    <div className={props.className}>
        {
            tags.map(tag => (<TagBox tag={tag} removeTag={removeTag} />))
        }
        {
            props.innerElements && props.innerElements.map(element => element)
        }
        <Search items={searchItems.getAllIdTitle()} selectItem={selectItem} />
    </div>
  )
}

export default TagBar