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
    "url" TEXT NOT NULL,
    "description" TEXT,
    "urlMetadata" TEXT NOT NULL,
    "descriptionMetadata" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
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

CREATE TABLE "comments"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "userId" INTEGER REFERENCES "users"("id") NOT NULL,
    "postId" INTEGER REFERENCES "posts"("id") NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "shared"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "postId" INTEGER REFERENCES "posts"("id") NOT NULL,
    "repostUserId" INTEGER REFERENCES "users"("id") NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "followers"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "userId" INTEGER REFERENCES "users"("id") NOT NULL,
    "following" INTEGER REFERENCES "users"("id") NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    UNIQUE("userId","following")
);


