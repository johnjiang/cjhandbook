import React, { ReactElement } from "react";
import { Space } from "antd";
import styled from "styled-components";
import Media from "react-media";
import isEmpty from "lodash/isEmpty";
import "antd/es/date-picker/style/css";

import artData from "../../../data/json/art.json";
import useLocalStorage from "../../helpers/use-local-storage";
import SearchInput from "./search-input";
import { MEDIA_QUERY } from "../../helpers/media";
import { Art } from "../../types";
import ArtCards from "./art-cards";

const ToolbarContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    align-items: center;
`;

const SearchContainer = styled.div`
    width: 200px;
    padding-right: 10px;
`;

function filterArt(
    arts: Art[],
    ownedArt: Record<string, boolean>,
    hideOwned: boolean,
    searchFilter: string,
): Art[] {
    let filteredArts = arts;

    if (hideOwned) {
        filteredArts = filteredArts.filter((data) => {
            return !ownedArt[data.name];
        });
    }

    if (searchFilter && !isEmpty(searchFilter)) {
        filteredArts = filteredArts.filter((data) => {
            return data.name.toLowerCase().includes(searchFilter.toLowerCase());
        });
    }

    return filteredArts;
}

export default function ArtGuide(): ReactElement {
    const [hideOwned] = useLocalStorage("hideOwned", false);
    const [searchFilter, setSearchFilter] = useLocalStorage("artSearch", "");

    const defaultOwnedArt: Record<string, boolean> = {};

    const [ownedArt, setOwnedArt] = useLocalStorage(
        "ownedArt",
        defaultOwnedArt,
    );

    const arts = filterArt(artData, ownedArt, hideOwned, searchFilter);

    function onOwnedArt(artName: string, isCaught: boolean): void {
        const newOwnedArt = {
            ...ownedArt,
            [artName]: isCaught,
        };
        setOwnedArt(newOwnedArt);
    }

    return (
        <>
            <ToolbarContainer>
                <Media query={MEDIA_QUERY}>
                    {(matches): ReactElement => {
                        return (
                            <Space
                                direction={matches ? "vertical" : "horizontal"}
                            >
                                <SearchContainer>
                                    <SearchInput
                                        query={searchFilter}
                                        onChange={setSearchFilter}
                                    />
                                </SearchContainer>
                            </Space>
                        );
                    }}
                </Media>
            </ToolbarContainer>
            <ArtCards
                arts={arts}
                ownedArt={ownedArt}
                onOwnedArtChange={onOwnedArt}
            />
        </>
    );
}
