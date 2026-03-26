-- =========================
-- ROLES
-- =========================
INSERT INTO public."roles" ("idRole", "name")
VALUES (1, 'ADMIN'),
       (2, 'AGENT'),
       (3, 'REQUESTER');

-- =========================
-- TICKET STATUS
-- =========================
INSERT INTO public."ticketStatus" ("idTicketStat", "code", "name", "sort", "final")
VALUES (1, 'OPEN', 'Open', 1, false),
       (2, 'IN_PROGRESS', 'In Progress', 2, false),
       (3, 'ON_HOLD', 'On Hold', 3, false),
       (4, 'RESOLVED', 'Resolved', 4, false),
       (5, 'CLOSED', 'Closed', 5, true);

-- =========================
-- PRIORITIES
-- =========================
INSERT INTO public."ticketPriorities" ("idTicketPrio", "code", "name", "sort")
VALUES (1, 'LOW', 'Low', 1),
       (2, 'MEDIUM', 'Medium', 2),
       (3, 'HIGH', 'High', 3),
       (4, 'URGENT', 'Urgent', 4);

-- =========================
-- CATEGORIES
-- =========================
INSERT INTO public."ticketCategories" ("idTicketCat", "name", "description")
VALUES (1, 'Software', 'Software related issues'),
       (2, 'Hardware', 'Hardware failures or repairs'),
       (3, 'Network', 'Connectivity and network issues'),
       (4, 'Access', 'User access and credentials'),
       (5, 'Other', 'Miscellaneous issues');

-- =========================
-- USERS
-- =========================
-- All seeded users share this development password: Resuelvet123
INSERT INTO public."users"
("idUser", "firstName", "lastName", "email", "username", "passwordHash", "idRole")
VALUES (gen_random_uuid(), 'Luis', 'Reza', 'luis@resuelvet.com', 'lreza', '$2b$10$s/xuT4VRWjbxGDdmra6WoesD4yEn9Ir3a3K8iZ85YEz8Hp40qkyk2', 1),
       (gen_random_uuid(), 'Ana', 'Lopez', 'ana@resuelvet.com', 'alopez', '$2b$10$s/xuT4VRWjbxGDdmra6WoesD4yEn9Ir3a3K8iZ85YEz8Hp40qkyk2', 2),
       (gen_random_uuid(), 'Carlos', 'Mendez', 'carlos@resuelvet.com', 'cmendez', '$2b$10$s/xuT4VRWjbxGDdmra6WoesD4yEn9Ir3a3K8iZ85YEz8Hp40qkyk2', 2),
       (gen_random_uuid(), 'Maria', 'Garcia', 'maria@resuelvet.com', 'mgarcia', '$2b$10$s/xuT4VRWjbxGDdmra6WoesD4yEn9Ir3a3K8iZ85YEz8Hp40qkyk2', 3),
       (gen_random_uuid(), 'Juan', 'Perez', 'juan@resuelvet.com', 'jperez', '$2b$10$s/xuT4VRWjbxGDdmra6WoesD4yEn9Ir3a3K8iZ85YEz8Hp40qkyk2', 3);

-- =========================
-- SAMPLE TICKETS
-- =========================
-- We use subqueries to fetch user IDs dynamically

INSERT INTO public."tickets"
("idTicket", "ticketNo", "title", "description", "idTicketStat", "idTicketPrio", "idTicketCat", "idUserReq",
 "idUserAsig")
VALUES (gen_random_uuid(),
        'TCK-0001',
        'Cannot login to system',
        'User cannot access the system with correct credentials',
        1,
        3,
        4,
        (SELECT "idUser" FROM public."users" WHERE "username" = 'mgarcia'),
        (SELECT "idUser" FROM public."users" WHERE "username" = 'alopez')),
       (gen_random_uuid(),
        'TCK-0002',
        'Computer not turning on',
        'Workstation does not power on',
        2,
        4,
        2,
        (SELECT "idUser" FROM public."users" WHERE "username" = 'jperez'),
        (SELECT "idUser" FROM public."users" WHERE "username" = 'cmendez')),
       (gen_random_uuid(),
        'TCK-0003',
        'Slow internet connection',
        'Internet is very slow in the office',
        1,
        2,
        3,
        (SELECT "idUser" FROM public."users" WHERE "username" = 'mgarcia'),
        NULL);

-- =========================
-- COMMENTS
-- =========================
INSERT INTO public."ticketComments"
("idTicketComm", "comment", "internal", "idTicket", "idUser")
VALUES (gen_random_uuid(),
        'User reported issue via phone',
        false,
        (SELECT "idTicket" FROM public."tickets" WHERE "ticketNo" = 'TCK-0001'),
        (SELECT "idUser" FROM public."users" WHERE "username" = 'mgarcia')),
       (gen_random_uuid(),
        'Reset password and asked user to try again',
        true,
        (SELECT "idTicket" FROM public."tickets" WHERE "ticketNo" = 'TCK-0001'),
        (SELECT "idUser" FROM public."users" WHERE "username" = 'alopez'));

-- =========================
-- TICKET HISTORY
-- =========================
INSERT INTO public."ticketHistory"
("idTicketHist", "idTicket", "currentIdTicketStat", "newIdTicketStat", "userChanged", "reason")
VALUES (gen_random_uuid(),
        (SELECT "idTicket" FROM public."tickets" WHERE "ticketNo" = 'TCK-0001'),
        NULL,
        1,
        (SELECT "idUser" FROM public."users" WHERE "username" = 'mgarcia'),
        'Ticket created'),
       (gen_random_uuid(),
        (SELECT "idTicket" FROM public."tickets" WHERE "ticketNo" = 'TCK-0002'),
        1,
        2,
        (SELECT "idUser" FROM public."users" WHERE "username" = 'cmendez'),
        'Started working on issue');