create table players
(
    id       serial primary key,
    user_id  bigint      not null,
    nickname varchar(255) not null,
    description varchar(255) not null
);