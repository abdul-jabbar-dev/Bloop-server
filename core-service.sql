--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2023-10-24 09:19:18

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3418 (class 0 OID 207324)
-- Dependencies: 214
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: bloopAdmin
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
89523f32-0d47-45e8-97bd-b35d51b8c128	7f5253117f5abf1ea655c4c4ed178614e91bc373ce0763ed1843cb5e7f84a008	2023-10-20 01:50:27.787276+06	20231019195027_	\N	\N	2023-10-20 01:50:27.52725+06	1
eae572ef-c104-4444-b42a-64027fbce13b	83e95934f9b2256025c043755df1f40169f66fe8de90567646d46e5fc5db2173	2023-10-20 02:25:13.696775+06	20231019202513_	\N	\N	2023-10-20 02:25:13.680843+06	1
6b03bd2d-e2ea-4acb-89d0-0fc8c223c1e4	af79ab1f4e4fb9870b2ef9c4e440e1365c84b801c16587c560477cacf41c5d8e	2023-10-20 16:50:46.94391+06	20231020105046_	\N	\N	2023-10-20 16:50:46.934215+06	1
d36fa4cb-950f-4c8a-993b-4ee9604c3fcb	d33a8cfd94b9b24ccbd202a2718f0da02683883f9218d3f52c88ada16e73c838	2023-10-20 23:59:27.088809+06	20231020175927_	\N	\N	2023-10-20 23:59:27.077964+06	1
6854a3a3-b239-4d54-b180-8fa2bbfeb203	20f9bea0b15e29101ca4557f77f4c0b76f04006228812f8df90b29ade1484bf8	2023-10-21 00:32:29.655561+06	20231020183229_	\N	\N	2023-10-21 00:32:29.649531+06	1
2cab7cf5-027a-42b5-b82b-9584e51f36b5	ae8f2f07aaf2997191b758a5a1f890005a2b37a2ac49c5d9519ab187a6b57893	2023-10-23 00:28:16.26639+06	20231022182816_	\N	\N	2023-10-23 00:28:16.248669+06	1
53dbba6f-9cee-4cd7-b4d3-1814c9ae421b	66fd625094ad7b60e2188f93d40f1909e9df74db9b97b396f1994c4b5f0d5662	2023-10-23 16:39:20.687267+06	20231023103920_	\N	\N	2023-10-23 16:39:20.672307+06	1
2471187f-1b40-4a3c-9e19-7ab4fafef07f	4aec57622c729555b97182aeccaf214694202dcb78859b830436ba858ff3770c	2023-10-23 23:07:26.124355+06	20231023170726_	\N	\N	2023-10-23 23:07:26.114689+06	1
\.


--
-- TOC entry 3429 (class 0 OID 207443)
-- Dependencies: 225
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: bloopAdmin
--

COPY public.media (id, public_id, format, created_at, url, secure_url, folder, original_filename, "createdAt", "updatedAt") FROM stdin;
830b203e-c26d-48ff-a5cf-a8c4dc585e5b	bloop/tuoer0uzts8yndlfj0fr	png	2023-10-19T19:58:28Z	http://res.cloudinary.com/dnkwv76h3/image/upload/v1697745508/bloop/tuoer0uzts8yndlfj0fr.png	https://res.cloudinary.com/dnkwv76h3/image/upload/v1697745508/bloop/tuoer0uzts8yndlfj0fr.png	bloop	76696749	2023-10-19 19:58:29.284	2023-10-19 19:58:29.284
7d517af8-bb90-4f6e-8f94-ac7adace27ee	bloop/vpm0uwdw3vyufybzrqex	jpg	2023-10-19T20:01:47Z	http://res.cloudinary.com/dnkwv76h3/image/upload/v1697745707/bloop/vpm0uwdw3vyufybzrqex.jpg	https://res.cloudinary.com/dnkwv76h3/image/upload/v1697745707/bloop/vpm0uwdw3vyufybzrqex.jpg	bloop	picture	2023-10-19 20:01:49.066	2023-10-19 20:01:49.066
6233b0e2-54f1-4061-9445-d53d29096cc0	bloop/lqynun0mivylsmmwmryh	png	2023-10-19T20:04:26Z	http://res.cloudinary.com/dnkwv76h3/image/upload/v1697745866/bloop/lqynun0mivylsmmwmryh.png	https://res.cloudinary.com/dnkwv76h3/image/upload/v1697745866/bloop/lqynun0mivylsmmwmryh.png	bloop	car mechanic	2023-10-19 20:04:28.137	2023-10-19 20:04:28.137
d4e28f69-f51c-4516-8f2c-3e90163e6698	bloop/services/rjvbzdxfk86zmd7obhda	jpg	2023-10-20T19:09:08Z	http://res.cloudinary.com/dnkwv76h3/image/upload/v1697828948/bloop/services/rjvbzdxfk86zmd7obhda.jpg	https://res.cloudinary.com/dnkwv76h3/image/upload/v1697828948/bloop/services/rjvbzdxfk86zmd7obhda.jpg	bloop/services	oven	2023-10-20 19:09:09.184	2023-10-20 19:09:09.184
905638ee-1dc7-4de7-9b1b-e1e2b41389c2	bloop/services/cguzhaszkdew6inv6q3e	jpg	2023-10-21T09:36:56Z	http://res.cloudinary.com/dnkwv76h3/image/upload/v1697881016/bloop/services/cguzhaszkdew6inv6q3e.jpg	https://res.cloudinary.com/dnkwv76h3/image/upload/v1697881016/bloop/services/cguzhaszkdew6inv6q3e.jpg	bloop/services	car wash	2023-10-21 09:36:57.575	2023-10-21 09:36:57.575
9801481f-e5ac-4a93-9d92-7fcfd5c77f93	bloop/services/xhjn7thsc1airgmc7j31	jpg	2023-10-23T20:09:05Z	http://res.cloudinary.com/dnkwv76h3/image/upload/v1698091745/bloop/services/xhjn7thsc1airgmc7j31.jpg	https://res.cloudinary.com/dnkwv76h3/image/upload/v1698091745/bloop/services/xhjn7thsc1airgmc7j31.jpg	bloop/services	laptop2	2023-10-23 20:09:07.172	2023-10-23 20:09:07.172
\.


--
-- TOC entry 3419 (class 0 OID 207363)
-- Dependencies: 215
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: bloopAdmin
--

COPY public."user" (id, "firstName", "lastName", email, "profileImage", address, "contactNo", gender, "dateOfBirth", role, "bloodGroup", status, "providerUid", "createdAt", "updatedAt") FROM stdin;
2cfeca82-b6f8-4703-85ab-657bd9f708c4	Abdul	Jabbar	abdul.jabbar.dev@gmail.com	830b203e-c26d-48ff-a5cf-a8c4dc585e5b	\N	\N	\N	\N	subscriber	\N	active	BLWSfbwtaFUaKzjYsgfuq1HD17D2	2023-10-19 19:58:29.284	2023-10-19 20:01:12.235
9f55db96-100d-4385-9fc2-d1fb3f40cc03	Abdul	Jabbar	\N	7d517af8-bb90-4f6e-8f94-ac7adace27ee	\N	\N	\N	\N	subscriber	\N	deactive	bJWSc6Amwvb8R34Mh5wSoqVFwLw2	2023-10-19 20:01:49.066	2023-10-19 20:01:49.066
631a7cab-1435-4189-a5b0-ebf742b0b917	admin	admin	admin@gmai.com	\N	\N	\N	\N	\N	admin	\N	active	\N	2023-10-19 20:05:05.261	2023-10-19 20:06:00.518
67ed4609-5a6b-44c7-9136-5ba650935c90	sub	scriber	sub@gmail.com	\N	\N	\N	\N	\N	subscriber	\N	active	\N	2023-10-21 17:14:51.283	2023-10-21 17:14:51.283
cc00508d-80a1-475e-bd81-24ba58dc13b4	sub2	scriber2	sub2@gmail.com	\N	\N	\N	\N	\N	subscriber	\N	active	\N	2023-10-21 17:16:26.853	2023-10-21 17:16:26.853
919065c1-5023-4130-bb3d-700718b1c4d4	mir	jhafor	mir@gmail.com	\N	\N	\N	\N	\N	subscriber	\N	active	\N	2023-10-21 17:17:04.254	2023-10-21 17:17:04.254
e34bda25-5842-44ef-93f4-9463a01f941b	mr	provider	provider@gmail.com	\N	\N	\N	\N	15-3-2004	serviceProvider	\N	active	\N	2023-10-21 17:18:21.84	2023-10-23 13:53:21.199
734278bf-fbd0-4fdd-b03c-239a7f951744	Rafi	Khan	rafi@gmail.com	6233b0e2-54f1-4061-9445-d53d29096cc0	\N	\N	\N	\N	serviceProvider	\N	active	\N	2023-10-19 20:03:04.293	2023-10-23 17:08:06.081
a31bef4d-9b1f-4437-8e31-9aa7a25e7d9a	Ashfak	ovik	ashfak@gmail.com	\N	\N	\N	\N	\N	serviceProvider	\N	active	\N	2023-10-19 19:51:01.593	2023-10-23 18:10:42.62
\.


--
-- TOC entry 3420 (class 0 OID 207371)
-- Dependencies: 216
-- Data for Name: credential; Type: TABLE DATA; Schema: public; Owner: bloopAdmin
--

COPY public.credential (id, "userId", role, email, password, "accessToken", "refreshToken", "createdAt", "updatedAt") FROM stdin;
3153af21-ba5b-4c3a-86bf-e45ff3d264c9	2cfeca82-b6f8-4703-85ab-657bd9f708c4	subscriber	abdul.jabbar.dev@gmail.com	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjZmVjYTgyLWI2ZjgtNDcwMy04NWFiLTY1N2JkOWY3MDhjNCIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3NzQ1NTA5LCJleHAiOjE2OTgwMDQ3MDl9.xhgdDQpoQAqZvwRLFo8o8pPOkYGUCJKdZfPRQaRldJM	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjZmVjYTgyLWI2ZjgtNDcwMy04NWFiLTY1N2JkOWY3MDhjNCIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3NzQ1NTA5LCJleHAiOjE3MjkyODE1MDl9.8iwGQ0Wt9QNrB1GKhczpcqBfIxAnZgUaRK4uKmjjdbE	2023-10-19 19:58:29.284	2023-10-19 19:58:29.284
682bf8d2-94af-4ccd-a665-f29feba2069c	9f55db96-100d-4385-9fc2-d1fb3f40cc03	subscriber	\N	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlmNTVkYjk2LTEwMGQtNDM4NS05ZmMyLWQxZmIzZjQwY2MwMyIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3NzQ1NzA5LCJleHAiOjE2OTgwMDQ5MDl9.qdf611z2I1JfBdEMsy7niti3UZn7S-R93byn18y5CGQ	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlmNTVkYjk2LTEwMGQtNDM4NS05ZmMyLWQxZmIzZjQwY2MwMyIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3NzQ1NzA5LCJleHAiOjE3MjkyODE3MDl9.JdFf1qq2tbAcw-xT1tKejA6Uie4lggQkzYDBabBmP6c	2023-10-19 20:01:49.066	2023-10-19 20:01:49.066
97b66efa-4c05-4464-9e90-262930d07ee6	67ed4609-5a6b-44c7-9136-5ba650935c90	subscriber	sub@gmail.com	$2b$15$luQ/9./gzEHjALblxM0S1OjqSnzGAipJHyUBgiuSOnq.An3gX19Ui	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWQ0NjA5LTVhNmItNDRjNy05MTM2LTViYTY1MDkzNWM5MCIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3OTA4NDkzLCJleHAiOjE2OTgxNjc2OTN9.E8Kn8QHxVRFyG6LXJ8V0B8-JgeXL_uKfcASWHPArjrI	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWQ0NjA5LTVhNmItNDRjNy05MTM2LTViYTY1MDkzNWM5MCIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3OTA4NDkzLCJleHAiOjE3Mjk0NDQ0OTN9.wl2GptuLHTficvgRfwwm7O84pMC0EagjLToVLZv6kCc	2023-10-21 17:14:51.283	2023-10-21 17:14:51.283
44627392-0fa1-41e2-9c77-dd048bcf2066	cc00508d-80a1-475e-bd81-24ba58dc13b4	subscriber	sub2@gmail.com	$2b$15$A7BXix37cQyApSeEn1QhKOEXvfE6pvewmsT.AY6q78jxgK570Ew4i	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNjMDA1MDhkLTgwYTEtNDc1ZS1iZDgxLTI0YmE1OGRjMTNiNCIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3OTA4NTg4LCJleHAiOjE2OTgxNjc3ODh9.Fnyim3lroPE71GNqgjJk0vatCBYc2u_utSlD8aketE8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNjMDA1MDhkLTgwYTEtNDc1ZS1iZDgxLTI0YmE1OGRjMTNiNCIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3OTA4NTg4LCJleHAiOjE3Mjk0NDQ1ODh9.0tSg4EkD3qzFUIeXcuuKTDgV4QI_4RXJLOHamqloisQ	2023-10-21 17:16:26.853	2023-10-21 17:16:26.853
036fdb1a-14ae-414b-b5d8-0f35471cd898	919065c1-5023-4130-bb3d-700718b1c4d4	subscriber	mir@gmail.com	$2b$15$l3wTwCMb/vBp4FcAzD7EU.nvK.QGFfJeRsFsm2pQ8qC2fIe0go8eq	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxOTA2NWMxLTUwMjMtNDEzMC1iYjNkLTcwMDcxOGIxYzRkNCIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3OTA4NjI2LCJleHAiOjE2OTgxNjc4MjZ9.rnaOvgzEm_YYYOhpJpNNQjPtCatVjOZSOhWuFg2p5M4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxOTA2NWMxLTUwMjMtNDEzMC1iYjNkLTcwMDcxOGIxYzRkNCIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3OTA4NjI2LCJleHAiOjE3Mjk0NDQ2MjZ9.EiHZoyP3STd3i12S3yo7MtLA6UruIyThybZBW6GC0nQ	2023-10-21 17:17:04.254	2023-10-21 17:17:04.254
2347df5d-7de7-4cd9-b070-138df91cd23d	734278bf-fbd0-4fdd-b03c-239a7f951744	serviceProvider	rafi@gmail.com	$2b$15$ST1LwhxA/4iCAH3U8wjU7.AUZyQ.93TAH7WvPLts538CRvjgiuGvm	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczNDI3OGJmLWZiZDAtNGZkZC1iMDNjLTIzOWE3Zjk1MTc0NCIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3NzQ1Nzg2LCJleHAiOjE2OTgwMDQ5ODZ9.y4_3meHA4xRfSgOb9Abn0u6oFfxE-j__kiyTncOZ9mo	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczNDI3OGJmLWZiZDAtNGZkZC1iMDNjLTIzOWE3Zjk1MTc0NCIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3NzQ1Nzg2LCJleHAiOjE3MjkyODE3ODZ9.qoaz2mOTrGQ_crWzQv01v0Z3NqrgDi2UPE44XSZrVOY	2023-10-19 20:03:04.293	2023-10-23 17:08:06.081
580d6f50-428c-443c-aa1c-42d6d8da9550	e34bda25-5842-44ef-93f4-9463a01f941b	serviceProvider	provider@gmail.com	$2b$15$wnhC2MBqu7H341LPe0r4L.fzbV9OiY5zvslq7CkGINhBXqA6cPH36	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzNGJkYTI1LTU4NDItNDRlZi05M2Y0LTk0NjNhMDFmOTQxYiIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3OTA4NzAzLCJleHAiOjE2OTgxNjc5MDN9.rKP_DjS2Rn5dqf9fdlt3kGsKZ-KWaMw5txcu66rzYLM	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzNGJkYTI1LTU4NDItNDRlZi05M2Y0LTk0NjNhMDFmOTQxYiIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3OTA4NzAzLCJleHAiOjE3Mjk0NDQ3MDN9.VpJy5sO2OnJDN3LKePu4Jx-u0t14QUOMweMdUWHvLZo	2023-10-21 17:18:21.84	2023-10-23 13:53:21.199
b3522c4f-8eb7-4683-baa3-88da123615fa	a31bef4d-9b1f-4437-8e31-9aa7a25e7d9a	serviceProvider	ashfak@gmail.com	$2b$15$RP7a3CPDzZTPs.fF4h5AWeogVGyGFn5H.RK266EpbvH4OAI/TOyde	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEzMWJlZjRkLTliMWYtNDQzNy04ZTMxLTlhYTdhMjVlN2Q5YSIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3NzQ1MDYzLCJleHAiOjE2OTgwMDQyNjN9.E3ZCwF-xuQ1Cvkt82iCqK4LYoCS5R6a233GbyioZLmQ	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEzMWJlZjRkLTliMWYtNDQzNy04ZTMxLTlhYTdhMjVlN2Q5YSIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNjk3NzQ1MDYzLCJleHAiOjE3MjkyODEwNjN9.TWFB9uc6tvBSHdgZe4a6RhhaXjJSeFG2a4nA-hoFSGA	2023-10-19 19:51:01.593	2023-10-23 18:10:42.62
cb4b3072-3f72-4f2c-800c-497b47ba594d	631a7cab-1435-4189-a5b0-ebf742b0b917	admin	admin@gmai.com	$2b$15$MB7p51g1oPLRD/Cob5fmsufDmKfI8qYHsuCp4Y6HRwVBv2cfcfrFu	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMWE3Y2FiLTE0MzUtNDE4OS1hNWIwLWViZjc0MmIwYjkxNyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5ODA3MTcxMCwiZXhwIjoxNjk4MjQ0NTEwfQ.bo4_JizK8N8V0DRuEAbAkXGew811b-G_pwH0fVC9wYg	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMWE3Y2FiLTE0MzUtNDE4OS1hNWIwLWViZjc0MmIwYjkxNyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5ODA3MTcxMCwiZXhwIjoxNzI5NjA3NzEwfQ.zdi--NkkaUBp0rk-gDlR8EL-jEjE-7z_BMGtOsPCUm0	2023-10-19 20:05:05.261	2023-10-23 14:35:10.82
\.


--
-- TOC entry 3424 (class 0 OID 207403)
-- Dependencies: 220
-- Data for Name: subscriber; Type: TABLE DATA; Schema: public; Owner: bloopAdmin
--

COPY public.subscriber (id, status, "userId", "createdAt", "updatedAt") FROM stdin;
47bde823-ed0f-42c7-a502-f2f7dd4138a3	active	a31bef4d-9b1f-4437-8e31-9aa7a25e7d9a	2023-10-19 19:51:01.593	2023-10-19 19:51:01.593
69cc8e3b-af9a-47e5-b4dd-9ef87697ce4f	active	734278bf-fbd0-4fdd-b03c-239a7f951744	2023-10-19 20:03:04.293	2023-10-19 20:03:04.293
9feff03a-858c-4a29-ad4c-66e4656a17c7	active	631a7cab-1435-4189-a5b0-ebf742b0b917	2023-10-19 20:05:05.261	2023-10-19 20:05:05.261
00595b2a-e35a-4f06-b10e-26b20c0ec09d	active	67ed4609-5a6b-44c7-9136-5ba650935c90	2023-10-21 17:14:51.283	2023-10-21 17:14:51.283
1a78c019-628b-4f2a-a35a-e5603e0a8805	active	cc00508d-80a1-475e-bd81-24ba58dc13b4	2023-10-21 17:16:26.853	2023-10-21 17:16:26.853
5ade833c-51be-4a49-8a49-9b195305cae0	active	919065c1-5023-4130-bb3d-700718b1c4d4	2023-10-21 17:17:04.254	2023-10-21 17:17:04.254
4dcdeb62-19fb-466f-95ca-f9e3ea1dd0b4	active	e34bda25-5842-44ef-93f4-9463a01f941b	2023-10-21 17:18:21.84	2023-10-21 17:18:21.84
\.


--
-- TOC entry 3426 (class 0 OID 207419)
-- Dependencies: 222
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: bloopAdmin
--

COPY public."order" (id, "subscriberId", "servicePlacedId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3422 (class 0 OID 207387)
-- Dependencies: 218
-- Data for Name: serviceType; Type: TABLE DATA; Schema: public; Owner: bloopAdmin
--

COPY public."serviceType" (id, title, "createdAt", "updatedAt") FROM stdin;
e563342a-8db7-451d-a736-d5308dc97f4d	Ren service	2023-10-19 19:51:50.039	2023-10-19 19:51:50.039
637c2f6a-5c59-4673-9e1a-100a6ef8a3a9	Washing service	2023-10-19 19:52:02.359	2023-10-19 19:52:02.359
014db17b-0bb2-41c3-8a29-21b9069edb49	Electric service	2023-10-19 19:52:16.748	2023-10-19 19:52:16.748
65f9abcf-dcd9-4560-ac19-dce398d37015	Assist service	2023-10-19 19:52:25.857	2023-10-19 19:52:25.857
3df901f8-f8c0-449f-97cd-85b6c6ce7abf	Ac and freeze service	2023-10-22 18:48:54.432	2023-10-22 18:48:54.432
\.


--
-- TOC entry 3421 (class 0 OID 207379)
-- Dependencies: 217
-- Data for Name: service; Type: TABLE DATA; Schema: public; Owner: bloopAdmin
--

COPY public.service (id, title, price, "orderType", "serviceArea", details, "serviceGuarantee", status, "serviceItem", thumbnail, "serviceTypeId", "createdAt", "updatedAt") FROM stdin;
571641ee-1d68-4679-a0de-6c218d9c3d27	Car and bike wash service	1200	Offline	{Dhaka,Gazipur,Narsingdi,"Cox's Bazar"}	The largest marketplace in Bangladesh where we serve you with every possible service. AC Repairing service is one of our services to repair all types of AC related problems. We deliver expert and AC repair services with integrity from our professional service providers.	No Guarantee	active	{Car,Bike}	905638ee-1dc7-4de7-9b1b-e1e2b41389c2	637c2f6a-5c59-4673-9e1a-100a6ef8a3a9	2023-10-21 09:36:57.575	2023-10-21 09:36:57.575
5630c5a9-9795-4288-a96f-993fe97af624	Electronic Appliance service	1450	Basic	{Dhaka,Gazipur}	The largest marketplace in Bangladesh where we serve you with every possible service. AC Repairing service is one of our services to repair all types of AC related problems. We deliver expert and AC repair services with integrity from our professional service providers.	30day	active	{Oven,Freeze,TV,Fan,Light,More}	d4e28f69-f51c-4516-8f2c-3e90163e6698	014db17b-0bb2-41c3-8a29-21b9069edb49	2023-10-20 19:09:09.184	2023-10-23 20:10:54.058
fee8110a-b279-4164-86b3-5c6b82cfdfb6	Electronic Appliance Checking	1800	Offline	{Gazipur,Dhaka}	The largest marketplace in Bangladesh where we serve you with every possible service. AC Repairing service is one of our services to repair all types of AC related problems. We deliver expert and AC repair services with integrity from our professional service providers.	30day	active	{Laptop,Monitor,Computer,"Computer accessories",Printer}	9801481f-e5ac-4a93-9d92-7fcfd5c77f93	014db17b-0bb2-41c3-8a29-21b9069edb49	2023-10-23 20:09:07.172	2023-10-23 20:11:06.524
\.


--
-- TOC entry 3423 (class 0 OID 207395)
-- Dependencies: 219
-- Data for Name: serviceProvider; Type: TABLE DATA; Schema: public; Owner: bloopAdmin
--

COPY public."serviceProvider" (id, "serviceTypeId", availability, status, "createdAt", "updatedAt", "userId", "providerId") FROM stdin;
baf340f8-0400-4da0-9fad-90130db95f2e	014db17b-0bb2-41c3-8a29-21b9069edb49	t	active	2023-10-23 13:53:21.199	2023-10-23 13:53:21.199	e34bda25-5842-44ef-93f4-9463a01f941b	EL001
3a91876c-910d-4ba7-8eab-90691788d9bb	014db17b-0bb2-41c3-8a29-21b9069edb49	t	active	2023-10-23 17:08:06.081	2023-10-23 17:08:06.081	734278bf-fbd0-4fdd-b03c-239a7f951744	EL002
fff5b96b-4ea7-4066-8c0f-53369c849c56	e563342a-8db7-451d-a736-d5308dc97f4d	t	active	2023-10-23 18:10:42.62	2023-10-23 18:10:42.62	a31bef4d-9b1f-4437-8e31-9aa7a25e7d9a	RE003
\.


--
-- TOC entry 3428 (class 0 OID 207435)
-- Dependencies: 224
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: bloopAdmin
--

COPY public.feedback (id, message, rating, "orderId", "serviceId", "serviceProviderId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3427 (class 0 OID 207427)
-- Dependencies: 223
-- Data for Name: servicePlaced; Type: TABLE DATA; Schema: public; Owner: bloopAdmin
--

COPY public."servicePlaced" (id, "bookedDate", "orderId", "serviceId", "serviceProviderId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3425 (class 0 OID 207411)
-- Dependencies: 221
-- Data for Name: shippingAddress; Type: TABLE DATA; Schema: public; Owner: bloopAdmin
--

COPY public."shippingAddress" (id, "subscriberId", "shippingNumber", country, street, town, city, address, label, "contactNo", "createdAt", "updatedAt") FROM stdin;
\.


-- Completed on 2023-10-24 09:19:18

--
-- PostgreSQL database dump complete
--

