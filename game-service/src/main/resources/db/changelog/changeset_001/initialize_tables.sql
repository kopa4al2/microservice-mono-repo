create table players
(
    id           bigserial primary key,
    nickname     varchar(255) not null,
    score        bigint       not null default 0,
    current_game bigint                default null
);

create table games
(
    id          bigserial primary key,
    game_state  varchar(255) not null,
    host        bigint       not null,
    create_date timestamp    not null default current_timestamp
);

create table players_games
(
    game_id   bigint not null,
    player_id bigint not null,
    PRIMARY KEY (game_id, player_id)
);

alter table players
    add constraint fk_current_game foreign key (current_game) references games (id)
        on delete set null on update no action;

alter table games
    add constraint fk_host_id foreign key (host) references players (id)
        on delete set null on update no action;

alter table players_games
    add constraint fk_player_id foreign key (player_id) references players (id)
        on delete cascade on update cascade,
    add constraint fk_game_id foreign key (game_id) references games (id)
        on delete cascade on update cascade,
    add constraint uk_game_player_id unique (game_id, player_id);