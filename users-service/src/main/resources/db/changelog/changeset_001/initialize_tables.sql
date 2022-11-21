create table users
(
    id              serial primary key,
    email           varchar(50)  not null unique,
    username        varchar(16)  not null unique,
    password        varchar(255) not null,
    user_details_id bigint
);

create table user_details
(
    id          serial primary key,
    address     varchar(1000),
    description varchar(1000)
);

create table user_players
(
    user_id   bigint,
    player_id bigint,
    PRIMARY KEY (user_id, player_id)
);

alter table users
    add constraint fk_user_details foreign key (user_details_id) references user_details (id)
        on delete set null on update no action;

alter table user_players
    add constraint fk_user_id foreign key (user_id) references users (id)
        on delete cascade on update cascade,
    add constraint uk_user_player_id unique (user_id, player_id);