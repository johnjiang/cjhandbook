import React, { CSSProperties, ReactElement } from "react";
import { Card, Skeleton } from "antd";
import styled from "styled-components";

import { Art } from "../../types";

const { Meta } = Card;

const CardContainer = styled.div`
    padding-bottom: 10px;
`;

const ArtGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-gap: 5px;
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    display: block;
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;

    @media (max-width: 1800px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

interface Props {
    arts: Art[];
    ownedArt: Record<string, boolean>;
    onOwnedArtChange: (artName: string, isCaught: boolean) => void;
}

const cardHeadeStyle: CSSProperties = { textAlign: "center" };

export default function ArtCards({
    arts,
}: // ownedArt,
// onOwnedArtChange,
Props): ReactElement {
    return (
        <CardGrid>
            {arts.map(
                (art): ReactElement => {
                    const artUrlName = art.name
                        .toLowerCase()
                        .replace(/\s/g, "-");
                    const realFileName = `${artUrlName}-real.png`;
                    const fakeFilename = `${artUrlName}-fake.png`;
                    const isStatue = art.name.includes("Statue");

                    const realCard = (
                        <Card
                            headStyle={cardHeadeStyle}
                            style={{
                                width: "100%",
                            }}
                            type="inner"
                            title="Real"
                            bordered={false}
                            cover={
                                isStatue ? (
                                    <Skeleton />
                                ) : (
                                    <Image
                                        src={`/images/art/${realFileName}`}
                                        alt={art.name}
                                        loading="lazy"
                                    />
                                )
                            }
                        />
                    );

                    return (
                        <CardContainer key={art.name}>
                            <Card
                                headStyle={cardHeadeStyle}
                                title={<span>{art.name}</span>}
                                style={{
                                    height: "100%",
                                }}
                                cover={
                                    !art.fakes &&
                                    (isStatue ? (
                                        <Skeleton />
                                    ) : (
                                        <Image
                                            src={`/images/art/${realFileName}`}
                                            alt={art.name}
                                            loading="lazy"
                                        />
                                    ))
                                }
                            >
                                {art.fakes && (
                                    <ArtGroup>
                                        {realCard}

                                        <Card
                                            headStyle={cardHeadeStyle}
                                            style={{
                                                width: "100%",
                                            }}
                                            type="inner"
                                            title="Fake"
                                            bordered={false}
                                            cover={
                                                isStatue ? (
                                                    <Skeleton />
                                                ) : (
                                                    <Image
                                                        src={`/images/art/${fakeFilename}`}
                                                        alt={art.name}
                                                        loading="lazy"
                                                    />
                                                )
                                            }
                                        >
                                            {art.fakes[0].reason}
                                        </Card>
                                    </ArtGroup>
                                )}

                                <Meta
                                    title={art.artist}
                                    description={`${art.originalName}, ${art.year}`}
                                />
                            </Card>
                        </CardContainer>
                    );
                },
            )}
        </CardGrid>
    );
}
