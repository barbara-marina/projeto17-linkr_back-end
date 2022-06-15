CREATE TABLE "users"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "username" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "sessions"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "userId" INTEGER REFERENCES "users"("id") NOT NULL, 
    "token" TEXT UNIQUE NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT TRUE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "posts"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "userId" INTEGER REFERENCES "users"("id") NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "hashtags"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "postId" INTEGER REFERENCES "posts"("id") NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "likes"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "userId" INTEGER REFERENCES "users"("id") NOT NULL,
    "postId" INTEGER REFERENCES "posts"("id") NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);