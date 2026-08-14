---
title: "YAGNI: The Discipline of Not Building It Yet"
description: Why "we might need this later" is a trap, and why separation of concerns — not speculative generality — is what actually makes code easy to extend.
category: coding
tags: ["yagni", "software-design", "separation-of-concerns", "principles"]
date: 2026-08-14
---

A lot of unnecessary complexity in codebases doesn't come from solving hard problems. It comes from solving problems that don't exist yet. A developer writes a plugin system for one plugin, a config layer for one environment, an abstract base class for one implementation — all justified by "this might be used in the future." Most of the time it isn't, and the code sits there as bloat: more surface area to read, more paths to test, more places for a bug to hide, all in service of a requirement nobody has actually asked for.

YAGNI — "You Aren't Gonna Need It" — is the discipline of refusing that trade. Build what the current requirement needs, not what a hypothetical future requirement might need.

## The Real Fix Isn't "Write Less Code", It's Draw Better Boundaries

Taken too literally, YAGNI can sound like an excuse to write tangled, inextensible code — "why bother separating anything, I'll just add it later." That's not the point. The point is that **premature abstraction and no abstraction are the same mistake**: both guess at a shape the problem doesn't have yet.

The actual answer is separation of concerns. If a piece of code has a single, well-defined responsibility and talks to the rest of the system through a narrow interface, it can be extended later without needing to write the extension now. The boundary is the future-proofing. The implementation behind it doesn't need to be.

## A Simple Example

Say a product currently needs to send email notifications. A developer anticipating "we'll probably want SMS and push notifications eventually" might build a generic dispatch system for channels that don't exist yet:

```php
// Speculative generality: built for requirements that don't exist yet
class NotificationDispatcher
{
    // A registry keyed by string type only makes sense if more than one
    // type is ever going to exist. Today there's exactly one: email.
    private array $channels = [];

    // A registration API implies channels are plugged in dynamically,
    // but nothing in the codebase actually does that yet — it's all
    // wired up by hand at startup either way.
    public function register(string $type, callable $handler): void
    {
        $this->channels[$type] = $handler;
    }

    // Looping over a list of configs assumes a message might fan out to
    // several channels at once, a requirement nobody has asked for.
    public function dispatch(array $configs, string $message): void
    {
        foreach ($configs as $config) {
            // This lookup can only fail because the "channel" is just a
            // loosely-typed string key instead of a concrete dependency —
            // a whole class of bug that doesn't exist if you just call
            // the email sender directly.
            $handler = $this->channels[$config['type']] ?? null;
            if ($handler === null) {
                throw new RuntimeException("No handler registered for {$config['type']}");
            }
            // $config['options'] is an untyped bag shaped for channels
            // that don't exist yet, so it's unclear what it even holds
            // for the one channel that does.
            $handler($message, $config['options']);
        }
    }
}

// ...and somewhere else, wiring an email handler into a registry
// built to support channels nobody has requested yet.
```

This handles a requirement — multiple notification channels — that doesn't exist. Every part of it (the registry, the generic config shape, the runtime lookup) is bloat sitting on top of "send an email," and it'll get argued about in code review before a single SMS message is ever sent.

The YAGNI version solves only what's needed today, behind a boundary that doesn't need to know what's coming:

```php
// Just what's needed, behind a narrow interface
interface Notifier
{
    public function notify(string $message): void;
}

class EmailNotifier implements Notifier
{
    public function __construct(private string $recipient) {}

    public function notify(string $message): void
    {
        mail($this->recipient, 'Notification', $message);
    }
}
```

No registry, no generic config, no runtime dispatch — just a single-purpose class behind a one-method interface. When SMS is actually requested, the extension is additive, not a rewrite:

```php
class SmsNotifier implements Notifier
{
    public function __construct(private string $phoneNumber) {}

    public function notify(string $message): void
    {
        SmsGateway::send($this->phoneNumber, $message);
    }
}
```

`EmailNotifier` didn't change. Nothing that depends on `Notifier` had to change. The separation of concerns — "a notifier knows how to deliver a message, callers don't know or care how" — is what made this possible. It didn't require inventing a plugin system for it.

## Conclusion

YAGNI isn't a license to write sloppy, unstructured code, and separation of concerns isn't a license to over-engineer for requirements that don't exist. They solve two different problems: YAGNI keeps you from building features nobody asked for; separation of concerns keeps the features you do build from being expensive to extend later. Used together, they replace "let's build it flexible just in case" with something more honest — build exactly what's specified, draw the boundary where the responsibility naturally splits, and let the next requirement, when it actually arrives, tell you where the next extension point goes.

None of that works without a clear specification, though. Speculative generality and YAGNI-as-excuse both come from the same root cause: nobody was precise about what the system is actually supposed to do right now. Intentional programming — knowing exactly what you're building and why before you write it — is what makes both mistakes avoidable.
