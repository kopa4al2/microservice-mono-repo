create table terrain_tile
(
    id        bigserial primary key,
    map_index int          not null,
    name      varchar(50)  not null,
    asset     varchar(100) not null
);

create table building
(
    id    bigserial primary key,
    name  varchar(50)  not null,
    asset varchar(100) not null
);

create table unit
(
    id    bigserial primary key,
    name  varchar(50)  not null,
    asset varchar(100) not null
);

create table resource
(
    id    serial primary key,
    name  varchar(50)  not null,
    asset varchar(100) not null
);

create table unit_cost
(
    resource_id int    not null,
    unit_id     bigint not null,
    amount      bigint not null,
    PRIMARY KEY (resource_id, unit_id)
);

create table building_cost
(
    resource_id int    not null,
    building_id bigint not null,
    amount      bigint not null,
    PRIMARY KEY (resource_id, building_id)
);

alter table unit_cost
    add constraint fk_resource_id foreign key (resource_id) references resource (id)
        on delete cascade on update cascade;

alter table unit_cost
    add constraint fk_unit_u_id foreign key (unit_id) references unit (id)
        on delete cascade on update cascade;

alter table building_cost
    add constraint fk_resource_b_id foreign key (resource_id) references resource (id)
        on delete cascade on update cascade;

alter table building_cost
    add constraint fk_building_id foreign key (building_id) references building (id)
        on delete cascade on update cascade;
