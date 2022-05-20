package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCamera is a Querydsl query type for Camera
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCamera extends EntityPathBase<Camera> {

    private static final long serialVersionUID = 1246782823L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCamera camera = new QCamera("camera");

    public final NumberPath<Long> cameraId = createNumber("cameraId", Long.class);

    public final StringPath cameraPlace = createString("cameraPlace");

    public final QConstruction construction;

    public final QRoom room;

    public QCamera(String variable) {
        this(Camera.class, forVariable(variable), INITS);
    }

    public QCamera(Path<? extends Camera> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCamera(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCamera(PathMetadata metadata, PathInits inits) {
        this(Camera.class, metadata, inits);
    }

    public QCamera(Class<? extends Camera> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.construction = inits.isInitialized("construction") ? new QConstruction(forProperty("construction")) : null;
        this.room = inits.isInitialized("room") ? new QRoom(forProperty("room")) : null;
    }

}

