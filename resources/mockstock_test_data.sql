--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

-- Started on 2020-11-06 13:16:38

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

DROP DATABASE mockstock;
--
-- TOC entry 3023 (class 1262 OID 16395)
-- Name: mockstock; Type: DATABASE; Schema: -; Owner: mockstock_master
--

CREATE DATABASE mockstock WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


ALTER DATABASE mockstock OWNER TO mockstock_master;

\connect mockstock

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
-- TOC entry 3 (class 2615 OID 2200)
-- Name: test; Type: SCHEMA; Schema: -; Owner: postgres
--

--
-- NOTE: CHANGE THIS AND ALL OCCURANCES OF "test" TO "public" AFTER TESTING IS COMPLETE
--

CREATE SCHEMA test;


ALTER SCHEMA test OWNER TO postgres;

--
-- TOC entry 3024 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA test; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA test IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 16396)
-- Name: company; Type: TABLE; Schema: test; Owner: postgres
--

CREATE TABLE test.company (
    industry text NOT NULL,
    name text NOT NULL,
    ticker text NOT NULL,
    exchange text NOT NULL
);


ALTER TABLE test.company OWNER TO postgres;

INSERT INTO test.company VALUES (
    ('Hotels, Restaurants & Leisure', 'Royal Caribbean Cruises Ltd', 'RCL', 'NEW YORK STOCK EXCHANGE, INC.'),
    ('Hotels, Restaurants & Leisure', 'Darden Restaurants Inc', 'DRI', 'NEW YORK STOCK EXCHANGE, INC.'),
    ('Logistics & Transportation', 'CH Robinson Worldwide Inc', 'CHRW', 'NASDAQ NMS - GLOBAL MARKET'),
    ('Retail', 'Expedia Group Inc', 'EXPE', 'NASDAQ NMS - GLOBAL MARKET'),
    ('Technology', 'Intuit Inc', 'INTU', 'NASDAQ NMS - GLOBAL MARKET'),
    ('Biotechnology', 'Gilead Sciences Inc', 'GILD', 'NASDAQ NMS - GLOBAL MARKET'),
    ('Technology', 'Mastercard', 'MA', 'NEW YORK STOCK EXCHANGE, INC.'),
    ('Retail', 'Ulta Beauty Inc', 'ULTA', 'NASDAQ NMS - GLOBAL MARKET'),
    ('Life Sciences Tools & Services', 'Illumina Inc', 'ILMN', 'NASDAQ NMS - GLOBAL MARKET'),
    ('Media', 'Take-Two Interactive Software', 'TTWO', 'NASDAQ NMS - GLOBAL MARKET')
);

--
-- TOC entry 205 (class 1259 OID 16445)
-- Name: competitive; Type: TABLE; Schema: test; Owner: postgres
--

CREATE TABLE test.competitive (
    start_bal numeric(10,2) NOT NULL,
    current_bal numeric(10,2) NOT NULL,
    id integer NOT NULL,
    investments text[]
);


ALTER TABLE test.competitive OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16404)
-- Name: news; Type: TABLE; Schema: test; Owner: postgres
--

CREATE TABLE test.news (
    url text NOT NULL,
    image text,
    headline text NOT NULL,
    datetime date NOT NULL,
    category text NOT NULL,
    source text NOT NULL,
    ticker text NOT NULL
);


ALTER TABLE test.news OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16434)
-- Name: sandbox; Type: TABLE; Schema: test; Owner: postgres
--

CREATE TABLE test.sandbox (
    start_bal numeric(10,2) NOT NULL,
    cur_bal numeric(10,2) NOT NULL,
    id integer NOT NULL,
    investments text[]
);


ALTER TABLE test.sandbox OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16415)
-- Name: stock; Type: TABLE; Schema: test; Owner: postgres
--

CREATE TABLE test.stock (
    high_p numeric(7,2) NOT NULL,
    low_p numeric(7,2) NOT NULL,
    current_p numeric(7,2) NOT NULL,
    ticker text NOT NULL
);


ALTER TABLE test.stock OWNER TO postgres;

INSERT INTO test.stock VALUES (
    (58.61, 56.40, 57.27, 'RCL'),
    (98.13, 92.60, 96.71, 'DRI'),
    (90.76, 88.08, 88.17, 'CHRW'),
    (100.72, 97.17, 98.48, 'EXPE'),
    (347.91, 334.11, 342.87, 'INTU'),
    (61.19, 59.37, 59.99, 'GILD'),
    (312.72, 302.24, 308.21, 'MA'),
    (222.51, 216.79, 219.54, 'ULTA'),
    (311.94, 299.70, 310.11, 'ILMN'),
    (166.59, 161.19, 163.78, 'TTWO')
);

--
-- TOC entry 203 (class 1259 OID 16426)
-- Name: user; Type: TABLE; Schema: test; Owner: postgres
--

CREATE TABLE test."user" (
    id integer NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    created_at timestamp with time zone
);


ALTER TABLE test."user" OWNER TO postgres;

INSERT INTO test."user"(id, password, email) VALUES (
    1, 'BoWS3308!', 'hawa1428@colorado.edu'
)

--
-- TOC entry 3012 (class 0 OID 16396)
-- Dependencies: 200
-- Data for Name: company; Type: TABLE DATA; Schema: test; Owner: postgres
--



--
-- TOC entry 3017 (class 0 OID 16445)
-- Dependencies: 205
-- Data for Name: competitive; Type: TABLE DATA; Schema: test; Owner: postgres
--



--
-- TOC entry 3013 (class 0 OID 16404)
-- Dependencies: 201
-- Data for Name: news; Type: TABLE DATA; Schema: test; Owner: postgres
--



--
-- TOC entry 3016 (class 0 OID 16434)
-- Dependencies: 204
-- Data for Name: sandbox; Type: TABLE DATA; Schema: test; Owner: postgres
--



--
-- TOC entry 3014 (class 0 OID 16415)
-- Dependencies: 202
-- Data for Name: stock; Type: TABLE DATA; Schema: test; Owner: postgres
--



--
-- TOC entry 3015 (class 0 OID 16426)
-- Dependencies: 203
-- Data for Name: user; Type: TABLE DATA; Schema: test; Owner: postgres
--



--
-- TOC entry 2875 (class 2606 OID 16403)
-- Name: company company_pkey; Type: CONSTRAINT; Schema: test; Owner: postgres
--

ALTER TABLE ONLY test.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (ticker);


--
-- TOC entry 2877 (class 2606 OID 16433)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: test; Owner: postgres
--

ALTER TABLE ONLY test."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2880 (class 2606 OID 16440)
-- Name: sandbox id_const_fk; Type: FK CONSTRAINT; Schema: test; Owner: postgres
--

ALTER TABLE ONLY test.sandbox
    ADD CONSTRAINT id_const_fk FOREIGN KEY (id) REFERENCES test."user"(id);


--
-- TOC entry 2881 (class 2606 OID 16451)
-- Name: competitive id_const_fk; Type: FK CONSTRAINT; Schema: test; Owner: postgres
--

ALTER TABLE ONLY test.competitive
    ADD CONSTRAINT id_const_fk FOREIGN KEY (id) REFERENCES test."user"(id);


--
-- TOC entry 2878 (class 2606 OID 16410)
-- Name: news ticker_const_fk; Type: FK CONSTRAINT; Schema: test; Owner: postgres
--

ALTER TABLE ONLY test.news
    ADD CONSTRAINT ticker_const_fk FOREIGN KEY (ticker) REFERENCES test.company(ticker);


--
-- TOC entry 2879 (class 2606 OID 16421)
-- Name: stock ticker_const_fk; Type: FK CONSTRAINT; Schema: test; Owner: postgres
--

ALTER TABLE ONLY test.stock
    ADD CONSTRAINT ticker_const_fk FOREIGN KEY (ticker) REFERENCES test.company(ticker);


-- Completed on 2020-11-06 13:16:39

--
-- PostgreSQL database dump complete
--

