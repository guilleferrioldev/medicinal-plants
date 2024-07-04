:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
:- use_module(library(http/http_parameters)).

:- dynamic plants/1.
:- dynamic properties/1.

load_data :-
    load_plants,
    load_properties.

load_plants :-
    open('plantas.json', read, Stream),
    json_read_dict(Stream, Plants),
    assert(plants(Plants)),
    close(Stream).

load_properties :-
    open('propiedades.json', read, Stream),
    json_read_dict(Stream, Properties),
    assert(properties(Properties)),
    close(Stream).

plants_handler(Request) :-
    http_parameters(Request, [input(Input, [optional(true), default('')])]),
    plants(Plants),
    reply_json(json{input: Input, plants: Plants}).

:- http_handler(root(plants), plants_handler, []).

server(Port) :-
    load_data,
    http_server(http_dispatch, [port(Port)]).

:- server(8080).

