// auxiliar code for working with Box2D
// requires jQuery

// Box2D lib
var b2Vec2 = Box2D.Common.Math.b2Vec2
    ,   b2AABB = Box2D.Collision.b2AABB
    ,   b2BodyDef = Box2D.Dynamics.b2BodyDef
    ,   b2Body = Box2D.Dynamics.b2Body
    ,   b2FixtureDef = Box2D.Dynamics.b2FixtureDef
    ,   b2Fixture = Box2D.Dynamics.b2Fixture
    ,   b2World = Box2D.Dynamics.b2World
    ,   b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
    ,   b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
    ,   b2DebugDraw = Box2D.Dynamics.b2DebugDraw
    ,   b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
    ,   b2Shape = Box2D.Collision.Shapes.b2Shape
    ,   b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
    ,   b2Joint = Box2D.Dynamics.Joints.b2Joint
    ,   b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef
    ,   b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef
    ,   b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef
    ,   b2ContactListener = Box2D.Dynamics.b2ContactListener
    ;

// 1 metro = 100 pixels
var scale = 100;
var gravity;
var gravityX = 0;
var gravityY = 0;
var world;

// aux function for creating boxes
function CreateBox (world, x, y, width, height, options)
{
    // default values
    options = $.extend(true,
      {
        'density' : 1.0,
        'friction': 1.0,
        'restitution' : 0.5,

        'linearDamping' : 0.0,
        'angularDamping': 0.0,

        'fixedRotation': false,

        'type' : b2Body.b2_dynamicBody
    }, options);

    // Fixture: define physics propierties (density, friction, restitution)
    var fix_def = new b2FixtureDef();

    fix_def.density = options.density;
    fix_def.friction = options.friction;
    fix_def.restitution = options.restitution;

    // Shape: 2d geometry (circle or polygon)
    fix_def.shape = new b2PolygonShape();

    fix_def.shape.SetAsBox(width, height);

    // Body: position of the object and its type (dynamic, static o kinetic)
    var body_def = new b2BodyDef();
    body_def.position.Set(x, y);

    body_def.linearDamping = options.linearDamping;
    body_def.angularDamping = options.angularDamping;

    body_def.type = options.type; // b2_dynamicBody
    body_def.fixedRotation = options.fixedRotation;
    body_def.userData = options.user_data;

    var b = world.CreateBody(body_def);
    var f = b.CreateFixture(fix_def);

    return b;
}

// aux function for creating balls
function CreateBall (world, x, y, r, options)
{
    // default values
    options = $.extend(true, {
        'density' : 2.0,
        'friction': 0.5,
        'restitution' : 0.5,

        'linearDamping' : 0.0,
        'angularDamping': 0.0,

        'type' : b2Body.b2_dynamicBody
    }, options);

    var body_def = new b2BodyDef();
    var fix_def = new b2FixtureDef;

    fix_def.density = options.density;
    fix_def.friction = options.friction;
    fix_def.restitution = options.restitution;

    // Shape: 2d geometry (circle or polygon)
    var shape = new b2CircleShape(r);
    fix_def.shape = shape;

    body_def.position.Set(x, y);

    // friction
    body_def.linearDamping  = options.linearDamping;
    body_def.angularDamping = options.angularDamping;

    body_def.type = options.type;
    body_def.userData = options.user_data;

    var b = world.CreateBody(body_def);
    var f = b.CreateFixture(fix_def);

    return b;
}

// Create a Box2D world object
function CreateWorld (ctx, gravity)
{
    var doSleep = false;
    world = new b2World(gravity, doSleep);

    // DebugDraw is used to create the drawing with physics
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(ctx);
    debugDraw.SetDrawScale(scale);
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

    world.SetDebugDraw(debugDraw);

    // create the surface (an static object)
    // top wall
    CreateBox(world, 2, 8.105, 3, 0.1, {type : b2Body.b2_staticBody});
    // left wall
    CreateBox(world, -0.105, 6.05, 0.1, 6.105, {type : b2Body.b2_staticBody});
    // bottom wall
    CreateBox(world, 2, -0.105, 3, 0.1, {type : b2Body.b2_staticBody});
    // right wall
    CreateBox(world, 5.105, 6.05, 0.1, 6.105, {type : b2Body.b2_staticBody});

    return world;
}

function PreparePhysics (ctx)
{
    // gravity vector
    gravity = new b2Vec2(gravityX, gravityY);

    CreateWorld(ctx, gravity);
}
