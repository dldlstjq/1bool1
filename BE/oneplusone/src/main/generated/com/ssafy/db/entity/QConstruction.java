package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QConstruction is a Querydsl query type for Construction
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QConstruction extends EntityPathBase<Construction> {

    private static final long serialVersionUID = -1053263469L;

    public static final QConstruction construction = new QConstruction("construction");

    public final NumberPath<Long> constructionId = createNumber("constructionId", Long.class);

    public final StringPath constructName = createString("constructName");

    public QConstruction(String variable) {
        super(Construction.class, forVariable(variable));
    }

    public QConstruction(Path<? extends Construction> path) {
        super(path.getType(), path.getMetadata());
    }

    public QConstruction(PathMetadata metadata) {
        super(Construction.class, metadata);
    }

}

