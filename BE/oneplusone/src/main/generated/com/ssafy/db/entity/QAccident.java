package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAccident is a Querydsl query type for Accident
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAccident extends EntityPathBase<Accident> {

    private static final long serialVersionUID = -2131203119L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAccident accident = new QAccident("accident");

    public final DateTimePath<java.util.Date> accidentDate = createDateTime("accidentDate", java.util.Date.class);

    public final StringPath accidentDescription = createString("accidentDescription");

    public final NumberPath<Long> accidentId = createNumber("accidentId", Long.class);

    public final StringPath accidentPicture = createString("accidentPicture");

    public final StringPath accidentType = createString("accidentType");

    public final QCamera camera;

    public QAccident(String variable) {
        this(Accident.class, forVariable(variable), INITS);
    }

    public QAccident(Path<? extends Accident> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAccident(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAccident(PathMetadata metadata, PathInits inits) {
        this(Accident.class, metadata, inits);
    }

    public QAccident(Class<? extends Accident> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.camera = inits.isInitialized("camera") ? new QCamera(forProperty("camera"), inits.get("camera")) : null;
    }

}

