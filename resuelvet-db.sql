-- =========================
-- ResuelveT DB Schema
-- =========================

CREATE SCHEMA IF NOT EXISTS public;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE public."roles"
(
    "idRole" smallint PRIMARY KEY,
    "name"   varchar(50) NOT NULL UNIQUE
);

CREATE TABLE public."ticketStatus"
(
    "idTicketStat" smallint PRIMARY KEY,
    "code"         varchar(30) NOT NULL UNIQUE,
    "name"         varchar(50) NOT NULL,
    "sort"         smallint    NOT NULL DEFAULT 0,
    "final"        boolean     NOT NULL DEFAULT false
);

CREATE TABLE public."ticketPriorities"
(
    "idTicketPrio" smallint PRIMARY KEY,
    "code"         varchar(30) NOT NULL UNIQUE,
    "name"         varchar(50) NOT NULL,
    "sort"         smallint    NOT NULL DEFAULT 0
);

CREATE TABLE public."ticketCategories"
(
    "idTicketCat" smallint PRIMARY KEY,
    "name"        varchar(100) NOT NULL UNIQUE,
    "description" varchar(255),
    "dateCreated" timestamp    NOT NULL DEFAULT now()
);

CREATE TABLE public."users"
(
    "idUser"       uuid PRIMARY KEY      DEFAULT gen_random_uuid(),
    "firstName"    varchar(100) NOT NULL,
    "lastName"     varchar(100) NOT NULL,
    "email"        varchar(150) NOT NULL UNIQUE,
    "username"     varchar(50)  NOT NULL UNIQUE,
    "passwordHash" varchar(255) NOT NULL,
    "dateCreated"  timestamp    NOT NULL DEFAULT now(),
    "dateUpdated"  timestamp    NOT NULL DEFAULT now(),
    "active"       boolean      NOT NULL DEFAULT true,
    "idRole"       smallint     NOT NULL,
    CONSTRAINT "fk_users_idRole_roles_idRole"
        FOREIGN KEY ("idRole")
            REFERENCES public."roles" ("idRole")
            ON UPDATE CASCADE
            ON DELETE RESTRICT
);

CREATE TABLE public."tickets"
(
    "idTicket"     uuid PRIMARY KEY      DEFAULT gen_random_uuid(),
    "ticketNo"     varchar(20)  NOT NULL UNIQUE,
    "title"        varchar(150) NOT NULL,
    "description"  text         NOT NULL,
    "dateCreated"  timestamp    NOT NULL DEFAULT now(),
    "dateUpdated"  timestamp    NOT NULL DEFAULT now(),
    "dateResolved" timestamp,
    "dateClosed"   timestamp,
    "idTicketStat" smallint     NOT NULL,
    "idTicketPrio" smallint     NOT NULL,
    "idTicketCat"  smallint     NOT NULL,
    "idUserReq"    uuid         NOT NULL,
    "idUserAsig"   uuid,
    CONSTRAINT "fk_tickets_idUserReq_users_idUser"
        FOREIGN KEY ("idUserReq")
            REFERENCES public."users" ("idUser")
            ON UPDATE CASCADE
            ON DELETE RESTRICT,
    CONSTRAINT "fk_tickets_idUserAsig_users_idUser"
        FOREIGN KEY ("idUserAsig")
            REFERENCES public."users" ("idUser")
            ON UPDATE CASCADE
            ON DELETE SET NULL,
    CONSTRAINT "fk_tickets_idTicketStat_ticketStatus_idTicketStat"
        FOREIGN KEY ("idTicketStat")
            REFERENCES public."ticketStatus" ("idTicketStat")
            ON UPDATE CASCADE
            ON DELETE RESTRICT,
    CONSTRAINT "fk_tickets_idTicketPrio_ticketPriorities_idTicketPrio"
        FOREIGN KEY ("idTicketPrio")
            REFERENCES public."ticketPriorities" ("idTicketPrio")
            ON UPDATE CASCADE
            ON DELETE RESTRICT,
    CONSTRAINT "fk_tickets_idTicketCat_ticketCategories_idTicketCat"
        FOREIGN KEY ("idTicketCat")
            REFERENCES public."ticketCategories" ("idTicketCat")
            ON UPDATE CASCADE
            ON DELETE RESTRICT,
    CONSTRAINT "chk_tickets_dates"
        CHECK (
            ("dateResolved" IS NULL OR "dateResolved" >= "dateCreated")
                AND
            ("dateClosed" IS NULL OR "dateClosed" >= "dateCreated")
            )
);

CREATE TABLE public."ticketComments"
(
    "idTicketComm" uuid PRIMARY KEY   DEFAULT gen_random_uuid(),
    "comment"      text      NOT NULL,
    "internal"     boolean   NOT NULL DEFAULT false,
    "dateCreated"  timestamp NOT NULL DEFAULT now(),
    "idTicket"     uuid      NOT NULL,
    "idUser"       uuid      NOT NULL,
    CONSTRAINT "fk_ticketComments_idTicket_tickets_idTicket"
        FOREIGN KEY ("idTicket")
            REFERENCES public."tickets" ("idTicket")
            ON UPDATE CASCADE
            ON DELETE CASCADE,
    CONSTRAINT "fk_ticketComments_idUser_users_idUser"
        FOREIGN KEY ("idUser")
            REFERENCES public."users" ("idUser")
            ON UPDATE CASCADE
            ON DELETE RESTRICT
);

CREATE TABLE public."ticketHistory"
(
    "idTicketHist"        uuid PRIMARY KEY   DEFAULT gen_random_uuid(),
    "reason"              varchar(255),
    "dateChanged"         timestamp NOT NULL DEFAULT now(),
    "idTicket"            uuid      NOT NULL,
    "currentIdTicketStat" smallint,
    "newIdTicketStat"     smallint  NOT NULL,
    "userChanged"         uuid      NOT NULL,
    CONSTRAINT "fk_ticketHistory_idTicket_tickets_idTicket"
        FOREIGN KEY ("idTicket")
            REFERENCES public."tickets" ("idTicket")
            ON UPDATE CASCADE
            ON DELETE CASCADE,
    CONSTRAINT "fk_ticketHistory_currentIdTicketStat_ticketStatus_idTicketStat"
        FOREIGN KEY ("currentIdTicketStat")
            REFERENCES public."ticketStatus" ("idTicketStat")
            ON UPDATE CASCADE
            ON DELETE RESTRICT,
    CONSTRAINT "fk_ticketHistory_newIdTicketStat_ticketStatus_idTicketStat"
        FOREIGN KEY ("newIdTicketStat")
            REFERENCES public."ticketStatus" ("idTicketStat")
            ON UPDATE CASCADE
            ON DELETE RESTRICT,
    CONSTRAINT "fk_ticketHistory_userChanged_users_idUser"
        FOREIGN KEY ("userChanged")
            REFERENCES public."users" ("idUser")
            ON UPDATE CASCADE
            ON DELETE RESTRICT
);

-- =========================
-- INDEXES
-- =========================

CREATE INDEX "idx_users_idRole" ON public."users" ("idRole");

CREATE INDEX "idx_tickets_idTicketStat" ON public."tickets" ("idTicketStat");
CREATE INDEX "idx_tickets_idTicketPrio" ON public."tickets" ("idTicketPrio");
CREATE INDEX "idx_tickets_idTicketCat" ON public."tickets" ("idTicketCat");
CREATE INDEX "idx_tickets_idUserReq" ON public."tickets" ("idUserReq");
CREATE INDEX "idx_tickets_idUserAsig" ON public."tickets" ("idUserAsig");
CREATE INDEX "idx_tickets_dateCreated" ON public."tickets" ("dateCreated");

CREATE INDEX "idx_ticketComments_idTicket" ON public."ticketComments" ("idTicket");
CREATE INDEX "idx_ticketComments_idUser" ON public."ticketComments" ("idUser");
CREATE INDEX "idx_ticketComments_dateCreated" ON public."ticketComments" ("dateCreated");

CREATE INDEX "idx_ticketHistory_idTicket" ON public."ticketHistory" ("idTicket");
CREATE INDEX "idx_ticketHistory_currentIdTicketStat" ON public."ticketHistory" ("currentIdTicketStat");
CREATE INDEX "idx_ticketHistory_newIdTicketStat" ON public."ticketHistory" ("newIdTicketStat");
CREATE INDEX "idx_ticketHistory_userChanged" ON public."ticketHistory" ("userChanged");
CREATE INDEX "idx_ticketHistory_dateChanged" ON public."ticketHistory" ("dateChanged");